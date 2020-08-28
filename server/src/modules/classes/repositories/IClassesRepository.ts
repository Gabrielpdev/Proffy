import Class from '@modules/classes/infra/typeorm/entities/Classes';
import ICreateClassesDTO from '@modules/classes/dtos/ICreateClassesDTO';

export default interface IClassesRepository {
  create(data: ICreateClassesDTO): Promise<Class>;
}
