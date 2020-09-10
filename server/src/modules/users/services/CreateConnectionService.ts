import { injectable, inject } from 'tsyringe';

import Connections from '@modules/users/infra/typeorm/entities/Connections';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IConnectionRepository from '../repositories/IConnectionRepository';

interface IRequest {
  student_id: string;
  teacher_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('ConnectionsRepository')
    private connectionsRepository: IConnectionRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(data: IRequest): Promise<Connections> {
    const connection = await this.connectionsRepository.create(data);

    // await this.cacheProvider.invalidatePrefix('connection');

    return connection;
  }
}

export default CreateUserService;
