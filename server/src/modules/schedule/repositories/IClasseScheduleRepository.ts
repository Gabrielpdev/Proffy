import ClassesSchedule from '@modules/schedule/infra/typeorm/entities/ClassesSchedule';
import WeekDay from '@modules/schedule/infra/typeorm/entities/WeekDay';
import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';
import IFindByDay from '@modules/schedule/dtos/IFindByDay';

export default interface IClasseScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<ClassesSchedule>;
  findByDay(dayId: IFindByDay): Promise<WeekDay | undefined>;
}
