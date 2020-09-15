import Class from '@modules/classes/infra/typeorm/entities/Classes';
import ICreateClassesDTO from '@modules/classes/dtos/ICreateClassesDTO';
import IFindAllClassesBySubject from '../dtos/IFindAllClassesBySubject';
import IFindAllClassesByWeekDay from '../dtos/IFindAllClassesByWeekDay';
import IFindAllClassesByHour from '../dtos/IFindAllClassesByHour';
import IFindAllClassesBySubjectAndHour from '../dtos/IFindAllClassesBySubjectAndHour';
import IFindAllClassesByWeekDayAndHour from '../dtos/IFindAllClassesByWeekDayAndHour';
import IFindAllClassesByAllFilters from '../dtos/IFindAllClassesByAllFilters';
import IFindAllClassesByWeekDayAndSubject from '../dtos/IFindAllClassesByWeekDayAndSubject';

export default interface IClassesRepository {
  create(data: ICreateClassesDTO): Promise<Class>;
  findAllClasses(user_id: string): Promise<Class[] | undefined>;
  findAllClassesBySubject(
    data: IFindAllClassesBySubject | undefined,
  ): Promise<Class[] | undefined>;
  findAllClassesByWeekDay(
    data: IFindAllClassesByWeekDay | undefined,
  ): Promise<Class[] | undefined>;
  findAllClassesByHour(
    data: IFindAllClassesByHour | undefined,
  ): Promise<Class[] | undefined>;
  findAllClassesBySubjectAndHour(
    data: IFindAllClassesBySubjectAndHour | undefined,
  ): Promise<Class[] | undefined>;
  findAllClassesByWeekDayAndHour(
    data: IFindAllClassesByWeekDayAndHour | undefined,
  ): Promise<Class[] | undefined>;
  findAllClassesByWeekDayAndSubject(
    data: IFindAllClassesByWeekDayAndSubject | undefined,
  ): Promise<Class[] | undefined>;
  findAllClassesByAllFilters(
    data: IFindAllClassesByAllFilters | undefined,
  ): Promise<Class[] | undefined>;
}
