import { container } from 'tsyringe';

import ICacheProvier from './models/ICacheProvier';

import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvier>('CacheProvider', providers.redis);
