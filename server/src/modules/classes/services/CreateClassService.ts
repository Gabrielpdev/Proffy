import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import convertHourToMinute from 'utils/convertHourToMinutes';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IClasseScheduleRepository from '@modules/schedule/repositories/IClasseScheduleRepository';
import IClassesRepository from '../repositories/IClassesRepository';
import Class from '../infra/typeorm/entities/Classes';

interface ScheduleItem {
  class_id: string;
  week_day_id: string;
  from: number;
  to: number;
}
interface IRequest {
  subject_id: string;
  cost: number;
  user_id: string;
  schedule: [ScheduleItem];
}

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('ClassesScheduleRepository')
    private classesScheduleRepository: IClasseScheduleRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({
    subject_id,
    cost,
    schedule,
    user_id,
  }: IRequest): Promise<Class> {
    try {
      const classe = await this.classesRepository.create({
        subject_id,
        cost,
        user_id,
      });

      const { id } = classe;

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id: id,
          week_day_id: scheduleItem.week_day_id,
          from: convertHourToMinute(String(scheduleItem.from)),
          to: convertHourToMinute(String(scheduleItem.to)),
        };
      });

      classSchedule.forEach((scheduleItem: ScheduleItem): void => {
        // Checar se é horário valido
        if (scheduleItem.from > 1439 || scheduleItem.from < 0) {
          throw { message: 'Hour must be valid', statusCode: 400 };
        }

        // Checar se é horário valido
        if (
          convertHourToMinute(String(scheduleItem.to)) > 1439 ||
          convertHourToMinute(String(scheduleItem.to)) < 0
        ) {
          throw { message: 'Hour must be valid', statusCode: 400 };
        }

        // Checar se o dia já nao está ocupado
        const checkDay = classSchedule.filter(
          item => item.week_day_id === scheduleItem.week_day_id,
        );

        if (checkDay.length > 1) {
          throw { message: 'Day already been selected', statusCode: 400 };
        }

        this.classesScheduleRepository.create(scheduleItem);
      });

      return classe;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export default CreateClassService;
