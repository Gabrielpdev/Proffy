import Connections from '@modules/users/infra/typeorm/entities/Connections';
import ICreateConnectionDTO from '@modules/users/dtos/ICreateConnectionDTO';

export default interface IConnectionRepository {
  create(data: ICreateConnectionDTO): Promise<Connections>;
  getAllConnection(): Promise<number>;
}
