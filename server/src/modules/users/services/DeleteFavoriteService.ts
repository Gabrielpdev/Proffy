import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import IFavoriteRepository from '../repositories/IFavoriteRepository';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteFavoriteService {
  constructor(
    @inject('FavoriteRepository')
    private favoriteRepository: IFavoriteRepository,

    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<any> {
    const favorite = await this.favoriteRepository.getFavorites(user_id);

    const favoriteExist = favorite.find(item => item.student_id === user_id);

    if (!favoriteExist) {
      throw new AppError('This class is not favorited.');
    }

    await this.favoriteRepository.delete(id);

    const favoritesList = await this.favoriteRepository.getFavorites(user_id);

    const classes = await this.classesRepository.findAllClasses(user_id);

    const array: any[] = [];

    favoritesList.forEach(item => {
      classes?.forEach(classe => {
        if (item.class_id === classe.id) {
          array.push({
            ...classe,
            favorite_id: item.id,
          });
        }
      });
    });

    await this.cacheProvider.invalidatePrefix('favorite');

    return classToClass(array);
  }
}

export default DeleteFavoriteService;
