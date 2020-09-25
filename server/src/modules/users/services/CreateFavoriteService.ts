import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import Favorites from '@modules/users/infra/typeorm/entities/Favorites';
import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IFavoriteRepository from '../repositories/IFavoriteRepository';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  student_id: string;
  class_id: string;
}

@injectable()
class CreateFavoriteService {
  constructor(
    @inject('FavoriteRepository')
    private favoriteRepository: IFavoriteRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(data: IRequest): Promise<any> {
    const { class_id, student_id } = data;

    const checkClasseId = await this.classesRepository.findById(class_id);

    if (!checkClasseId) {
      throw new AppError('Class does not exists');
    }

    const favorites = await this.favoriteRepository.getFavorites(student_id);

    const checkFavoritesExists = favorites.find(
      favorite => favorite.class_id === class_id,
    );

    if (checkFavoritesExists) {
      throw new AppError('This class is already favorited');
    }

    await this.favoriteRepository.create(data);

    const favoritesList = await this.favoriteRepository.getFavorites(
      student_id,
    );

    const classes = await this.classesRepository.findAllClasses(student_id);

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

export default CreateFavoriteService;
