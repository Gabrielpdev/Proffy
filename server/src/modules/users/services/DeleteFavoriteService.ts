import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const favorite = await this.favoriteRepository.getFavorites(user_id);

    const favoriteExist = favorite.find(item => item.student_id === user_id);

    if (!favoriteExist) {
      throw new AppError('This class is not favorited.');
    }

    await this.favoriteRepository.delete(id);

    await this.cacheProvider.invalidatePrefix('favorite');
  }
}

export default DeleteFavoriteService;
