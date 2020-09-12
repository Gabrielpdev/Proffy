import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ICacheProvier from '@shared/container/providers/CacheProvider/models/ICacheProvier';

interface IRequest {
  name: string;
  email: string;
  password: string;
  bio: string;
  whatsapp: string;
  is_teacher: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvier,
  ) {}

  public async execute({
    name,
    email,
    password,
    bio,
    whatsapp,
    is_teacher,
  }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email address already exists');
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHashed,
      bio,
      whatsapp,
      is_teacher,
    });

    await this.cacheProvider.invalidatePrefix('teachers');

    return user;
  }
}

export default CreateUserService;
