import { getRepository, Repository } from 'typeorm';

import convertHourToMinute from 'utils/convertHourToMinutes';

import ICreateClassesDTO from '@modules/classes/dtos/ICreateClassesDTO';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import IFindAllClassesBySubject from '@modules/classes/dtos/IFindAllClassesBySubject';
import IFindAllClassesByWeekDay from '@modules/classes/dtos/IFindAllClassesByWeekDay';
import IFindAllClassesByHour from '@modules/classes/dtos/IFindAllClassesByHour';
import IFindAllClassesBySubjectAndHour from '@modules/classes/dtos/IFindAllClassesBySubjectAndHour';
import IFindAllClassesByWeekDayAndSubject from '@modules/classes/dtos/IFindAllClassesByWeekDayAndSubject';
import IFindAllClassesByWeekDayAndHour from '@modules/classes/dtos/IFindAllClassesByWeekDayAndHour';
import IFindAllClassesByAllFilters from '@modules/classes/dtos/IFindAllClassesByAllFilters';
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

  public async findAllClassesByAllFilters({
    user_id,
    hour,
    week_day_id,
    subject_id,
  }: IFindAllClassesByAllFilters): Promise<Class[] | undefined> {
    const time = convertHourToMinute(hour);

    const schedule = await this.ormRepository
      .createQueryBuilder('classes')
      .andWhere('classes.subject_id = :subject_id', {
        subject_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .leftJoinAndSelect('class_schedule.week_day', 'week_day')
      .where('class_schedule.week_day_id = :week_day_id', {
        week_day_id,
      })
      .andWhere('class_schedule.from >= :time', {
        time,
      })
      .andWhere('class_schedule.to < :time', {
        time,
      })
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async findAllClassesBySubject({
    subject_id,
    user_id,
  }: IFindAllClassesBySubject): Promise<Class[] | undefined> {
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
  }

  public async findAllClassesByWeekDay({
    week_day_id,
    user_id,
  }: IFindAllClassesByWeekDay): Promise<Class[] | undefined> {
    const classes = await this.ormRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.subject', 'subject')
      .leftJoinAndSelect('classes.user', 'users')
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .where('class_schedule.week_day_id = :week_day_id', {
        week_day_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('class_schedule.week_day', 'week_day')
      .andWhere('users.is_teacher = true')
      .getMany();

    return classes;
  }

  public async findAllClassesByHour({
    hour,
    user_id,
  }: IFindAllClassesByHour): Promise<Class[] | undefined> {
    const time = convertHourToMinute(hour);

    const classes = await this.ormRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.subject', 'subject')
      .leftJoinAndSelect('classes.user', 'users')
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .andWhere('class_schedule.from >= :time', {
        time,
      })
      .andWhere('class_schedule.to < :time', {
        time,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .andWhere('users.is_teacher = true')
      .getMany();
    return classes;
  }

  public async findAllClassesBySubjectAndHour({
    subject_id,
    hour,
    user_id,
  }: IFindAllClassesBySubjectAndHour): Promise<Class[] | undefined> {
    const time = convertHourToMinute(hour);

    const schedule = await this.ormRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.subject', 'subject')
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('classes.subject_id = :subject_id', {
        subject_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .where('class_schedule.from >= :time', {
        time,
      })
      .andWhere('class_schedule.to < :time', {
        time,
      })
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDayAndHour({
    week_day_id,
    hour,
    user_id,
  }: IFindAllClassesByWeekDayAndHour): Promise<Class[] | undefined> {
    const time = convertHourToMinute(hour);

    const schedule = await this.ormRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.subject', 'subject')
      .leftJoinAndSelect('classes.user', 'users')
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .where('class_schedule.from >= :time', {
        time,
      })
      .andWhere('class_schedule.to < :time', {
        time,
      })
      .andWhere('classes.week_day_id = :week_day_id', {
        week_day_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDayAndSubject({
    subject_id,
    user_id,
    week_day_id,
  }: IFindAllClassesByWeekDayAndSubject): Promise<Class[] | undefined> {
    const schedule = await this.ormRepository
      .createQueryBuilder('classes')
      .leftJoinAndSelect('classes.subject', 'subject')
      .leftJoinAndSelect('classes.user', 'users')
      .leftJoinAndSelect('classes.class_schedule', 'class_schedule')
      .where('class_schedule.week_day_id = :week_day_id', {
        week_day_id,
      })
      .andWhere('classes.subject_id = :subject_id', {
        subject_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
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
