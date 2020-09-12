import { injectable, inject } from 'tsyringe';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class NumberOfTeachersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(): Promise<number> {
    const keyCache = `teachers`;

    let teachers = await this.cacheProvider.recover<number>(keyCache);

    if (!teachers) {
      teachers = await this.usersRepository.numberOfTeachers();

      this.cacheProvider.save(keyCache, teachers);
    }

    return teachers;
  }
}

export default NumberOfTeachersService;
