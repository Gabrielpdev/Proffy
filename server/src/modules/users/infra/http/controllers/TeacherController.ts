import { Request, Response } from 'express';
import { container } from 'tsyringe';

import NumberOfTeachersService from '@modules/users/services/NumberOfTeachersService';

export default class TeacherController {
  public async index(request: Request, response: Response): Promise<Response> {
    const numberOfTeachers = container.resolve(NumberOfTeachersService);

    const teachers = await numberOfTeachers.execute();

    return response.json(teachers);
  }
}
