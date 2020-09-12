import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Favorites from '@modules/users/infra/typeorm/entities/Favorites';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IFavoriteRepository from '../repositories/IFavoriteRepository';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  student_id: string;
  teacher_id: string;
}

@injectable()
class CreateFavoriteService {
  constructor(
    @inject('FavoriteRepository')
    private favoriteRepository: IFavoriteRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute(data: IRequest): Promise<Favorites> {
    const { student_id, teacher_id } = data;

    if (student_id === teacher_id) {
      throw new AppError('You can not favorite yourself');
    }

    const checkStudentId = await this.usersRepository.findById(student_id);

    if (!checkStudentId) {
      throw new AppError('User does not exists');
    }

    const checkIsTeacher = await this.usersRepository.findById(teacher_id);

    if (checkIsTeacher?.is_teacher === false) {
      throw new AppError('You can just favorite a teacher');
    }

    const favorite = await this.favoriteRepository.create(data);

    await this.cacheProvider.invalidatePrefix('favorite');

    return favorite;
  }
}

export default CreateFavoriteService;
