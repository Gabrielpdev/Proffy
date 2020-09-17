import { inject, injectable } from 'tsyringe';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IWeekDaysRepository from '../repositories/IWeekDaysRepository';
import WeekDay from '../infra/typeorm/entities/WeekDay';

@injectable()
class ListDaysService {
  constructor(
    @inject('WeekDayRepository')
    private weekDayRepository: IWeekDaysRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(): Promise<WeekDay[] | undefined> {
    const keyCache = `days`;

    let days = await this.cacheProvider.recover<WeekDay[]>(keyCache);

    if (!days) {
      const domingo = await this.weekDayRepository.findByName('Domingo');
      const segunda = await this.weekDayRepository.findByName('Segunda-feira');
      const terca = await this.weekDayRepository.findByName('Terça-feira');
      const quarta = await this.weekDayRepository.findByName('Quarta-feira');
      const quinta = await this.weekDayRepository.findByName('Quinta-feira');
      const sexta = await this.weekDayRepository.findByName('Sexta-feira');
      const sabado = await this.weekDayRepository.findByName('Sábado');

      days = [domingo, segunda, terca, quarta, quinta, sexta, sabado];

      this.cacheProvider.save(keyCache, days);
    }

    return days;
  }
}

export default ListDaysService;
