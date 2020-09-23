import { injectable, inject } from 'tsyringe';

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

  public async execute(data: IRequest): Promise<Favorites> {
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

    const favorite = await this.favoriteRepository.create(data);

    await this.cacheProvider.invalidatePrefix('favorite');

    return favorite;
  }
}

export default CreateFavoriteService;
