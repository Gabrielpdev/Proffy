import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IClassesRepository from '@modules/classes/repositories/IClassesRepository';
import ClassesRepository from '@modules/classes/infra/typeorm/repositories/ClassesRepository';

import IConnectionRepository from '@modules/users/repositories/IConnectionRepository';
import ConnectionsRepository from '@modules/users/infra/typeorm/repositories/ConnectionRepository';

import IFavoriteRepository from '@modules/users/repositories/IFavoriteRepository';
import FavoriteRepository from '@modules/users/infra/typeorm/repositories/FavoriteRepository';

import IClasseScheduleRepository from '@modules/schedule/repositories/IClasseScheduleRepository';
import ClassesScheduleRepository from '@modules/schedule/infra/typeorm/repositories/ClassesScheduleRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRespository from '@modules/users/infra/typeorm/repositories/UserTokensRespository';

container.registerSingleton<IFavoriteRepository>(
  'FavoriteRepository',
  FavoriteRepository,
);

container.registerSingleton<IConnectionRepository>(
  'ConnectionsRepository',
  ConnectionsRepository,
);

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
