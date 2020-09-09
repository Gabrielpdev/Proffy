import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IClasseScheduleRepository from '@modules/schedule/repositories/IClasseScheduleRepository';
import ClassSchedule from '@modules/schedule/infra/typeorm/entities/ClassesSchedule';

interface ScheduleItem {
  class_id: string;
  week_day_id: string;
  from: number;
  to: number;
}
interface IRequest {
  subject_id: string | undefined;
  week_day_id: string | undefined;
  hour: string | undefined;
}

@injectable()
class ListClassesService {
  constructor(
    @inject('ClassesScheduleRepository')
    private classesScheduleRepository: IClasseScheduleRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({
    subject_id,
    week_day_id,
    hour,
  }: IRequest): Promise<ClassSchedule[] | undefined> {
    const keyCache = `classes:subject${subject_id}-weekDay:${week_day_id}-hours:${hour}`;

    let classes = await this.cacheProvider.recover<ClassSchedule[]>(keyCache);

    if (subject_id && !week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClassesBySubject({
          subject_id,
        });

        this.cacheProvider.save(keyCache, classes);
      }
    }

    if (!subject_id && week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClassesByWeekDay({
          week_day_id,
        });
        this.cacheProvider.save(keyCache, classes);
      }
    }

    if (!subject_id && !week_day_id && hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClassesByHour({
          hour,
        });
        this.cacheProvider.save(keyCache, classes);
      }
    }

    if (subject_id && week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClassesByWeekDayAndSubject(
          {
            week_day_id,
            subject_id,
          },
        );
        this.cacheProvider.save(keyCache, classes);
      }
    }

    if (!subject_id && week_day_id && hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClassesByWeekDayAndHour(
          {
            week_day_id,
            hour,
          },
        );
        this.cacheProvider.save(keyCache, classes);
      }
    }

    if (subject_id && !week_day_id && hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClassesBySubjectAndHour(
          {
            subject_id,
            hour,
          },
        );
        this.cacheProvider.save(keyCache, classes);
      }
    }

    if (subject_id && week_day_id && hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClassesByAllFilters(
          {
            subject_id,
            week_day_id,
            hour,
          },
        );
        this.cacheProvider.save(keyCache, classes);
      }
    }

    if (!subject_id && !week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesScheduleRepository.findAllClasses();

        this.cacheProvider.save(keyCache, classes);
      }
    }

    return classes;
  }
}

export default ListClassesService;
