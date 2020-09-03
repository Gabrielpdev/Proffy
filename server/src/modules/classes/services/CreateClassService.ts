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
  subject: string;
  cost: number;
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

  public async execute({ subject, cost, schedule }: IRequest): Promise<Class> {
    const classe = await this.classesRepository.create({
      subject,
      cost,
      schedule,
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

    classSchedule.forEach((item: ScheduleItem): void => {
      // Checar se é horario valido
      if (item.from > 1439 || item.from < 0) {
        throw new AppError('Hour must be valid');
      }

      // Checar se é horario valido
      if (
        convertHourToMinute(String(item.to)) > 1439 ||
        convertHourToMinute(String(item.to)) < 0
      ) {
        throw new AppError('Hour must be valid');
      }

      // Checar se o dia já nao está ocupado
      const checkDay = this.classesScheduleRepository.findByDay(
        item.week_day_id,
      );

      if (checkDay) {
        throw new AppError('Day already been selected');
      }

      this.classesScheduleRepository.create(item);
    });

    return classe;
  }
}

export default CreateClassService;
