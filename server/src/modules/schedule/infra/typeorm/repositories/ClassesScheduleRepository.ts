import { getRepository, Repository } from 'typeorm';

import convertHourToMinute from 'utils/convertHourToMinutes';

import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';
import IClasseScheduleRepository from '@modules/schedule/repositories/IClasseScheduleRepository';
import IFindAllClassesBySubject from '@modules/schedule/dtos/IFindAllClassesBySubject';
import IFindAllClassesByWeekDay from '@modules/schedule/dtos/IFindAllClassesByWeekDay';
import IFindAllClassesByHour from '@modules/schedule/dtos/IFindAllClassesByHour';
import IFindAllClassesBySubjectAndHour from '@modules/schedule/dtos/IFindAllClassesBySubjectAndHour';
import IFindAllClassesByWeekDayAndSubject from '@modules/schedule/dtos/IFindAllClassesByWeekDayAndSubject';
import IFindAllClassesByWeekDayAndHour from '@modules/schedule/dtos/IFindAllClassesByWeekDayAndHour';
import IFindAllClassesByAllFilters from '@modules/schedule/dtos/IFindAllClassesByAllFilters';

import ClassSchedule from '@modules/schedule/infra/typeorm/entities/ClassesSchedule';
import WeekDay from '../entities/WeekDay';

class ClassRepository implements IClasseScheduleRepository {
  private ormRepository: Repository<ClassSchedule>;

  private weekDayRepository: Repository<WeekDay>;

  constructor() {
    this.ormRepository = getRepository(ClassSchedule);
    this.weekDayRepository = getRepository(WeekDay);
  }

  public async findAllClasses(
    user_id: string,
  ): Promise<ClassSchedule[] | undefined> {
    const classes = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .where('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();
    return classes;
  }

  public async findAllClassesByAllFilters({
    user_id,
    hour,
    week_day_id,
    subject_id,
  }: IFindAllClassesByAllFilters): Promise<ClassSchedule[] | undefined> {
    const time = convertHourToMinute(hour);

    const schedule = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .where('classe_schedule.week_day_id = :week_day_id', {
        week_day_id,
      })
      .andWhere('classe_schedule.from >= :time', {
        time,
      })
      .andWhere('classe_schedule.to < :time', {
        time,
      })
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .andWhere('classes.subject_id = :subject_id', {
        subject_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async findAllClassesBySubject({
    subject_id,
    user_id,
  }: IFindAllClassesBySubject): Promise<ClassSchedule[] | undefined> {
    const schedule = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .where('classes.subject_id = :subject_id', {
        subject_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDay({
    week_day_id,
    user_id,
  }: IFindAllClassesByWeekDay): Promise<ClassSchedule[] | undefined> {
    const classes = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .where('classe_schedule.week_day_id = :week_day_id', {
        week_day_id,
      })
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();

    return classes;
  }

  public async findAllClassesByHour({
    hour,
    user_id,
  }: IFindAllClassesByHour): Promise<ClassSchedule[] | undefined> {
    const time = convertHourToMinute(hour);

    const classes = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .andWhere('classe_schedule.from >= :time', {
        time,
      })
      .andWhere('classe_schedule.to < :time', {
        time,
      })
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();
    return classes;
  }

  public async findAllClassesBySubjectAndHour({
    subject_id,
    hour,
    user_id,
  }: IFindAllClassesBySubjectAndHour): Promise<ClassSchedule[] | undefined> {
    const time = convertHourToMinute(hour);

    const schedule = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .where('classe_schedule.from >= :time', {
        time,
      })
      .andWhere('classe_schedule.to < :time', {
        time,
      })
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .andWhere('classes.subject_id = :subject_id', {
        subject_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDayAndHour({
    week_day_id,
    hour,
    user_id,
  }: IFindAllClassesByWeekDayAndHour): Promise<ClassSchedule[] | undefined> {
    const time = convertHourToMinute(hour);

    const schedule = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .where('classe_schedule.from >= :time', {
        time,
      })
      .andWhere('classe_schedule.to < :time', {
        time,
      })
      .andWhere('classes.week_day_id = :week_day_id', {
        week_day_id,
      })
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDayAndSubject({
    subject_id,
    user_id,
    week_day_id,
  }: IFindAllClassesByWeekDayAndSubject): Promise<ClassSchedule[] | undefined> {
    const schedule = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .where('classe_schedule.week_day_id = :week_day_id', {
        week_day_id,
      })
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .andWhere('classes.subject_id = :subject_id', {
        subject_id,
      })
      .andWhere('classes.user_id != :user_id', {
        user_id,
      })
      .leftJoinAndSelect('classes.user', 'users')
      .andWhere('users.is_teacher = true')
      .getMany();

    return schedule;
  }

  public async create({
    class_id,
    from,
    to,
    week_day_id,
  }: ICreateScheduleDTO): Promise<ClassSchedule> {
    const classSchedule = this.ormRepository.create({
      class_id,
      from,
      to,
      week_day_id,
    });

    await this.ormRepository.save(classSchedule);

    return classSchedule;
  }

  public async save(classSchedule: ClassSchedule): Promise<ClassSchedule> {
    return this.ormRepository.save(classSchedule);
  }
}

export default ClassRepository;
