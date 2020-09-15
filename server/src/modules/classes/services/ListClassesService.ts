import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

// import AppError from '@shared/errors/AppError';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import Classes from '@modules/classes/infra/typeorm/entities/Classes';

interface ScheduleItem {
  user_id: string;
  class_id: string;
  week_day_id: string;
  from: number;
  to: number;
}
interface IRequest {
  user_id: string;
  subject_id: string | undefined;
  week_day_id: string | undefined;
  hour: string | undefined;
}

@injectable()
class ListClassesService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({
    user_id,
    subject_id,
    week_day_id,
    hour,
  }: IRequest): Promise<Classes[] | undefined> {
    const keyCache = `classes:subject${subject_id}-weekDay:${week_day_id}-hours:${hour}-user:${user_id}`;

    let classes = await this.cacheProvider.recover<Classes[]>(keyCache);

    if (subject_id && !week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClassesBySubject({
          subject_id,
          user_id,
        });

        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }

    if (!subject_id && week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClassesByWeekDay({
          week_day_id,
          user_id,
        });
        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }

    if (!subject_id && !week_day_id && hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClassesByHour({
          hour,
          user_id,
        });
        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }

    if (subject_id && week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClassesByWeekDayAndSubject(
          {
            week_day_id,
            user_id,
            subject_id,
          },
        );
        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }

    if (!subject_id && week_day_id && hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClassesByWeekDayAndHour({
          week_day_id,
          hour,
          user_id,
        });
        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }

    if (subject_id && !week_day_id && hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClassesBySubjectAndHour({
          subject_id,
          hour,
          user_id,
        });
        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }

    if (subject_id && week_day_id && hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClassesByAllFilters({
          subject_id,
          week_day_id,
          hour,
          user_id,
        });
        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }

    if (!subject_id && !week_day_id && !hour) {
      if (!classes) {
        classes = await this.classesRepository.findAllClasses(user_id);

        this.cacheProvider.save(keyCache, classToClass(classes));
      }
    }
    return classToClass(classes);
  }
}

export default ListClassesService;
