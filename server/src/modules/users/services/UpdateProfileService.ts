import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';

import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  is_teacher: boolean;
  password?: string;
  old_password?: string;
}
@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    is_teacher,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('Email already in use.');
    }

    user.name = name;
    user.email = email;
    user.is_teacher = is_teacher;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set the new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('The old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    await this.cacheProvider.invalidatePrefix('classes');
    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
