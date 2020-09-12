import { injectable, inject } from 'tsyringe';

import Favorite from '@modules/users/infra/typeorm/entities/Favorites';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IFavoriteRepository from '../repositories/IFavoriteRepository';

@injectable()
class ListFavoritesService {
  constructor(
    @inject('FavoriteRepository')
    private favoriteRepository: IFavoriteRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(user_id: string): Promise<Favorite[]> {
    const keyCache = `favorite:user:${user_id}`;

    let favorites = await this.cacheProvider.recover<Favorite[]>(keyCache);

    if (!favorites) {
      favorites = await this.favoriteRepository.getFavorites(user_id);

      this.cacheProvider.save(keyCache, favorites);
    }

    return favorites;
  }
}

export default ListFavoritesService;
