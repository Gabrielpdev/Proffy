import { getRepository, Repository } from 'typeorm';

import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';
import IClasseScheduleRepository from '@modules/schedule/repositories/IClasseScheduleRepository';

import ClassSchedule from '@modules/schedule/infra/typeorm/entities/ClassesSchedule';

class ClassesScheduleRepository implements IClasseScheduleRepository {
  private ormRepository: Repository<ClassSchedule>;

  constructor() {
    this.ormRepository = getRepository(ClassSchedule);
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

export default ClassesScheduleRepository;
