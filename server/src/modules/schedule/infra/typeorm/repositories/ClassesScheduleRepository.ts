import { getRepository, Repository } from 'typeorm';

import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';
import IFindByDay from '@modules/schedule/dtos/IFindByDay';
import IClasseScheduleRepository from '@modules/schedule/repositories/IClasseScheduleRepository';
import ClassesSchedule from '../entities/ClassesSchedule';
import WeekDay from '../entities/WeekDay';

class ClassRepository implements IClasseScheduleRepository {
  private ormRepository: Repository<ClassesSchedule>;

  private weekDayRepository: Repository<WeekDay>;

  constructor() {
    this.ormRepository = getRepository(ClassesSchedule);
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

  public async create({
    class_id,
    from,
    to,
    week_day_id,
  }: ICreateScheduleDTO): Promise<ClassesSchedule> {
    const classSchedule = this.ormRepository.create({
      class_id,
      from,
      to,
      week_day_id,
    });

    await this.ormRepository.save(classSchedule);

    return classSchedule;
  }

  public async save(classSchedule: ClassesSchedule): Promise<ClassesSchedule> {
    return this.ormRepository.save(classSchedule);
  }
}

export default ClassRepository;
