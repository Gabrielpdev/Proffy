import { getRepository, Repository } from 'typeorm';

import IConnectionRepository from '@modules/users/repositories/IConnectionRepository';
import ICreateConnectionDTO from '@modules/users/dtos/ICreateConnectionDTO';

import Connections from '@modules/users/infra/typeorm/entities/Connections';

class ConnectionRepository implements IConnectionRepository {
  private ormRepository: Repository<Connections>;

  constructor() {
    this.ormRepository = getRepository(Connections);
  }

  public async getAllConnection(): Promise<number> {
    const connections = await this.ormRepository.count();

    return connections;
  }

  public async create(
    connectionData: ICreateConnectionDTO,
  ): Promise<Connections> {
    const connection = this.ormRepository.create(connectionData);

    await this.ormRepository.save(connection);

    return connection;
  }
}

export default ConnectionRepository;
