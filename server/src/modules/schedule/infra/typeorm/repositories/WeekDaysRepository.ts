import { getRepository, Repository } from 'typeorm';

import IWeekDaysRepository from '@modules/schedule/repositories/IWeekDaysRepository';

import WeekDay from '@modules/schedule/infra/typeorm/entities/WeekDay';

class WeekDaysRepository implements IWeekDaysRepository {
  private ormRepository: Repository<WeekDay>;

  constructor() {
    this.ormRepository = getRepository(WeekDay);
  }

  public async findByName(name: string): Promise<WeekDay | undefined> {
    const days = await this.ormRepository.findOne({ where: { name } });

    return days;
  }
}

export default WeekDaysRepository;
