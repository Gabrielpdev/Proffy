import { Request, Response } from 'express';
import convertHourToMinute from '../utils/convertHourToMinutes';
import db from '../database/connection';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    try {
      const filters = request.query;

      const subject = filters.subject as string;
      const week_day = filters.week_day as string;
      const time = filters.time as string;

      if (!filters.subject || !filters.week_day || !filters.time) {
        return response
          .status(400)
          .json({ error: 'Missing filters to search classes' });
      }

      const timeInMinutes = convertHourToMinute(time);

      const classes = await db('classes')
        .whereExists(function () {
          this.select('classes_schedule.*')
            .from('classes_schedule')
            .whereRaw('classes_schedule.class_id = classes.id')
            .whereRaw('classes_schedule.week_day = ??', [Number(week_day)])
            .whereRaw('classes_schedule.from <= ??', [timeInMinutes])
            .whereRaw('classes_schedule.to > ??', [timeInMinutes]);
        })
        .where('classes.subject', '=', subject)
        .join('users', 'classes.user_id', '=', 'users.id')
        .select(['classes.*', 'users.*']);

      return response.json(classes);
    } catch (err) {
      console.log(err);
    }
  }

  async create(request: Request, response: Response) {
    const { subject, cost, schedule } = request.body;

    const trx = await db.transaction();

    try {
      const user_id = request.user.id;

      const classInsertId = await trx
        .insert(
          {
            subject,
            cost,
            user_id,
          },
          ['id'],
        )
        .into('classes');

      const class_id = classInsertId[0].id;

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinute(scheduleItem.from),
          to: convertHourToMinute(scheduleItem.to),
        };
      });

      await trx('classes_schedule').insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (err) {
      await trx.rollback();
      console.log(err);

      return response.status(400).json({
        error: 'Unpexpected error while creating a new class.',
      });
    }
  }
}
