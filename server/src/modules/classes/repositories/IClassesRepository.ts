import Class from '@modules/classes/infra/typeorm/entities/Classes';
import ICreateClassesDTO from '@modules/classes/dtos/ICreateClassesDTO';
import IFindAllClassesBySubject from '../dtos/IFindAllClassesBySubject';
import IFindAllClassesByWeekDay from '../dtos/IFindAllClassesByWeekDay';
import IFindAllClassesByHour from '../dtos/IFindAllClassesByHour';

export default interface IClassesRepository {
  create(data: ICreateClassesDTO): Promise<Class>;
  findById(id: string): Promise<Class | undefined>;
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
}
