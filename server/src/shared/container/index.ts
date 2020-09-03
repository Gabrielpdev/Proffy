import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import ClassesRepository from '@modules/classes/infra/typeorm/repositories/ClassesRepository';

import IClasseScheduleRepository from '@modules/schedule/repositories/IClasseScheduleRepository';
import ClassesScheduleRepository from '@modules/schedule/infra/typeorm/repositories/ClassesScheduleRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRespository from '@modules/users/infra/typeorm/repositories/UserTokensRespository';

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  ClassesRepository,
);

container.registerSingleton<IClasseScheduleRepository>(
  'ClassesScheduleRepository',
  ClassesScheduleRepository,
);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRespository,
);
