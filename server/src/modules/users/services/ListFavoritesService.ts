import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Classes from '@modules/classes/infra/typeorm/entities/Classes';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import IFavoriteRepository from '../repositories/IFavoriteRepository';

@injectable()
class ListFavoritesService {
  constructor(
    @inject('FavoriteRepository')
    private favoriteRepository: IFavoriteRepository,

    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(user_id: string): Promise<Classes[] | any> {
    const keyCache = `favorite:user:${user_id}`;

    let favorites = await this.cacheProvider.recover<Classes[]>(keyCache);

    if (!favorites) {
      const favoritesList = await this.favoriteRepository.getFavorites(user_id);

      const classes = await this.classesRepository.findAllClasses(user_id);

      const array: any[] = [];

      favoritesList.forEach(favorite => {
        classes?.forEach(classe => {
          if (favorite.class_id === classe.id) {
            array.push({
              ...classe,
              favorite_id: favorite.id,
            });
          }
        });
      });

      favorites = classToClass(array);

      this.cacheProvider.save(keyCache, favorites);
    }

    return favorites;
  }
}

export default ListFavoritesService;
