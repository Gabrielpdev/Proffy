import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

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
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const favorite = await this.favoriteRepository.getFavorites(user_id);

    const favoriteExist = favorite.find(item => item.student_id === user_id);

    if (!favoriteExist) {
      throw new AppError('This teacher is not favorited.');
    }

    await this.favoriteRepository.delete(id);
  }
}

export default DeleteFavoriteService;
