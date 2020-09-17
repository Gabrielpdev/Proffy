import WeekDay from '@modules/schedule/infra/typeorm/entities/WeekDay';

export default interface IWeekDaysRepository {
  findByName(name: string): Promise<WeekDay | undefined>;
}
