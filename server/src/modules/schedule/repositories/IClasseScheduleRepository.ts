import ClassesSchedule from '@modules/classes/infra/typeorm/entities/ClassesSchedule';
import WeekDay from '@modules/classes/infra/typeorm/entities/WeekDay';
import ICreateScheduleDTO from '@modules/classes/dtos/ICreateScheduleDTO';
import IFindByDay from '@modules/classes/dtos/IFindByDay';

export default interface IClasseScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<ClassesSchedule>;
  findByDay(dayId: IFindByDay): Promise<WeekDay | undefined>;
}
