import { getRepository, Repository } from 'typeorm';

import convertHourToMinute from 'utils/convertHourToMinutes';

import ICreateClassesDTO from '@modules/classes/dtos/ICreateClassesDTO';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import IFindAllClassesBySubject from '@modules/classes/dtos/IFindAllClassesBySubject';
import IFindAllClassesByWeekDay from '@modules/classes/dtos/IFindAllClassesByWeekDay';
import IFindAllClassesByHour from '@modules/classes/dtos/IFindAllClassesByHour';
import Class from '../entities/Classes';

class ClassRepository implements IClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async findAllClasses(user_id: string): Promise<Class[] | undefined> {
    const classes = await this.ormRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.subject', 'subject')
      .leftJoinAndSelect('classes.user', 'users')
      .where('classes.user_id != :user_id', {
        user_id,
      })
      .andWhere('users.is_teacher = true')
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .leftJoinAndSelect('class_schedule.week_day', 'week_day')
      .getMany();
    return classes;
  }

  public async findAllClassesBySubject({
    subject_id,
    user_id,
  }: IFindAllClassesBySubject): Promise<Class[] | undefined> {
    try {
      const schedule = await this.ormRepository
        .createQueryBuilder('classes')
        .leftJoinAndSelect('classes.subject', 'subject')
        .leftJoinAndSelect('classes.user', 'users')
        .where('classes.subject_id = :subject_id', {
          subject_id,
        })
        .andWhere('classes.user_id != :user_id', {
          user_id,
        })
        .andWhere('users.is_teacher = true')
        .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
        .leftJoinAndSelect('class_schedule.week_day', 'week_day')
        .getMany();

      return schedule;
    } catch (err) {
      return undefined;
    }
  }

  public async findAllClassesByWeekDay({
    week_day_id,
    user_id,
  }: IFindAllClassesByWeekDay): Promise<Class[] | undefined> {
    try {
      const classes = await this.ormRepository
        .createQueryBuilder('classes')
        .innerJoinAndSelect('classes.subject', 'subject')
        .innerJoinAndSelect('classes.user', 'users')
        .andWhere('users.is_teacher = true')
        .innerJoinAndSelect('classes.class_schedule', 'class_schedule')
        .where('class_schedule.week_day_id = :week_day_id', {
          week_day_id,
        })
        .andWhere('classes.user_id != :user_id', {
          user_id,
        })
        .innerJoinAndSelect('class_schedule.week_day', 'week_day')
        .getMany();

      return classes;
    } catch (err) {
      return undefined;
    }
  }

  public async findAllClassesByHour({
    hour,
    user_id,
  }: IFindAllClassesByHour): Promise<Class[] | undefined> {
    // try {
    const time = convertHourToMinute(hour);

    const classes = await this.ormRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.subject', 'subject')
      .leftJoinAndSelect('classes.user', 'users')
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .innerJoinAndSelect('class_schedule.week_day', 'week_day')
      .andWhere('class_schedule.from <= :time', {
        time,
      })
      .andWhere('class_schedule.to > :time', {
        time,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .andWhere('users.is_teacher = true')
      .getMany();
    return classes;
    // } catch (err) {
    //   return undefined;
    // }
  }

  public async create(classData: ICreateClassesDTO): Promise<Class> {
    const classe = this.ormRepository.create(classData);

    await this.ormRepository.save(classe);

    return classe;
  }

  public async save(classe: Class): Promise<Class> {
    return this.ormRepository.save(classe);
  }
}

export default ClassRepository;
