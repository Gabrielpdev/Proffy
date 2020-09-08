import { getRepository, Repository } from 'typeorm';

import convertHourToMinute from 'utils/convertHourToMinutes';

import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';
import IFindByDay from '@modules/schedule/dtos/IFindByDay';
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

  public async findByDay({
    class_id,
    week_day_id,
  }: IFindByDay): Promise<WeekDay | undefined> {
    const findDay = this.weekDayRepository.findOne({
      where: { id: week_day_id, class_id },
    });
    return findDay;
  }

  public async findAllClasses(): Promise<ClassSchedule[] | undefined> {
    const classes = await this.ormRepository.find({
      relations: ['class'],
    });

    return classes;
  }

  public async findAllClassesByAllFilters({
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
      .getMany();

    return schedule;
  }

  public async findAllClassesBySubject({
    subject_id,
  }: IFindAllClassesBySubject): Promise<ClassSchedule[] | undefined> {
    const schedule = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .leftJoinAndSelect('classe_schedule.class', 'classes')
      .where('classes.subject_id = :subject_id', {
        subject_id,
      })
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDay({
    week_day_id,
  }: IFindAllClassesByWeekDay): Promise<ClassSchedule[] | undefined> {
    const classes = await this.ormRepository.find({
      relations: ['class'],
      where: { week_day_id },
    });

    return classes;
  }

  public async findAllClassesByHour({
    hour,
  }: IFindAllClassesByHour): Promise<ClassSchedule[] | undefined> {
    const time = convertHourToMinute(hour);

    const classes = await this.ormRepository
      .createQueryBuilder('classe_schedule')
      .where('classe_schedule.from >= :time', {
        time,
      })
      .andWhere('classe_schedule.to < :time', {
        time,
      })
      .getMany();
    return classes;
  }

  public async findAllClassesBySubjectAndHour({
    subject_id,
    hour,
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
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDayAndHour({
    week_day_id,
    hour,
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
      .getMany();

    return schedule;
  }

  public async findAllClassesByWeekDayAndSubject({
    subject_id,
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
