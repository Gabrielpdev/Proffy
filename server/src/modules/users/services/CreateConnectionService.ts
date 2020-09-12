import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Connections from '@modules/users/infra/typeorm/entities/Connections';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IConnectionRepository from '../repositories/IConnectionRepository';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  student_id: string;
  teacher_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('ConnectionsRepository')
    private connectionsRepository: IConnectionRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(data: IRequest): Promise<Connections> {
    const { student_id, teacher_id } = data;

    if (student_id === teacher_id) {
      throw new AppError('You can not connect to yourself');
    }

    const checkStudentId = await this.usersRepository.findById(student_id);

    if (!checkStudentId) {
      throw new AppError('User does not exists');
    }

    const connection = await this.connectionsRepository.create(data);

    await this.cacheProvider.invalidatePrefix('connection');

    return connection;
  }
}

export default CreateUserService;
