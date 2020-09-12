import { injectable, inject } from 'tsyringe';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IConnectionRepository from '../repositories/IConnectionRepository';

@injectable()
class NumberOfConnectionService {
  constructor(
    @inject('ConnectionsRepository')
    private connectionRepository: IConnectionRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(): Promise<number> {
    const keyCache = `connections`;

    let connection = await this.cacheProvider.recover<number>(keyCache);

    if (!connection) {
      connection = await this.connectionRepository.getAllConnection();

      this.cacheProvider.save(keyCache, connection);
    }

    return connection;
  }
}

export default NumberOfConnectionService;
