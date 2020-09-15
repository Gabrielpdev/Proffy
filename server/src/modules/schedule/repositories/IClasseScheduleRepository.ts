import ClassSchedule from '@modules/schedule/infra/typeorm/entities/ClassesSchedule';

import ICreateScheduleDTO from '@modules/schedule/dtos/ICreateScheduleDTO';
import IFindAllClassesBySubject from '../dtos/IFindAllClassesBySubject';
import IFindAllClassesByWeekDay from '../dtos/IFindAllClassesByWeekDay';
import IFindAllClassesByHour from '../dtos/IFindAllClassesByHour';
import IFindAllClassesBySubjectAndHour from '../dtos/IFindAllClassesBySubjectAndHour';
import IFindAllClassesByWeekDayAndHour from '../dtos/IFindAllClassesByWeekDayAndHour';
import IFindAllClassesByWeekDayAndSubject from '../dtos/IFindAllClassesByWeekDayAndSubject';
import IFindAllClassesByAllFilters from '../dtos/IFindAllClassesByAllFilters';

export default interface IClasseScheduleRepository {
  create(data: ICreateScheduleDTO): Promise<ClassSchedule>;
  findAllByWeekDay(week_day_id: string): Promise<string | undefined>;
  findAllClasses(user_id: string): Promise<ClassSchedule[] | undefined>;
  findAllClassesBySubject(
    data: IFindAllClassesBySubject | undefined,
  ): Promise<ClassSchedule[] | undefined>;
  findAllClassesByWeekDay(
    data: IFindAllClassesByWeekDay | undefined,
  ): Promise<ClassSchedule[] | undefined>;
  findAllClassesByHour(
    data: IFindAllClassesByHour | undefined,
  ): Promise<ClassSchedule[] | undefined>;
  findAllClassesBySubjectAndHour(
    data: IFindAllClassesBySubjectAndHour | undefined,
  ): Promise<ClassSchedule[] | undefined>;
  findAllClassesByWeekDayAndHour(
    data: IFindAllClassesByWeekDayAndHour | undefined,
  ): Promise<ClassSchedule[] | undefined>;
  findAllClassesByWeekDayAndSubject(
    data: IFindAllClassesByWeekDayAndSubject | undefined,
  ): Promise<ClassSchedule[] | undefined>;
  findAllClassesByAllFilters(
    data: IFindAllClassesByAllFilters | undefined,
  ): Promise<ClassSchedule[] | undefined>;
}
