import { injectable, inject } from 'tsyringe';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class NumberOfUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(): Promise<number> {
    const keyCache = `users`;

    let users = await this.cacheProvider.recover<number>(keyCache);

    if (!users) {
      users = await this.usersRepository.numberOfUsers();

      this.cacheProvider.save(keyCache, users);
    }

    return users;
  }
}

export default NumberOfUsersService;
