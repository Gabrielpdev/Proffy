import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import NumberOfUsersService from '@modules/users/services/NumberOfUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const numberOfUsers = container.resolve(NumberOfUsersService);

    const users = await numberOfUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, whatsapp, bio, is_teacher } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      whatsapp,
      bio,
      is_teacher,
    });

    return response.json(classToClass(user));
  }
}
