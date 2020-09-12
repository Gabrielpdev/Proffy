import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateConnectionService from '@modules/users/services/CreateConnectionService';
import NumberOfConnectionService from '@modules/users/services/NumberOfConnectionService';

export default class ConnectionController {
  public async index(request: Request, response: Response): Promise<Response> {
    const numberOfConnection = container.resolve(NumberOfConnectionService);

    const connections = await numberOfConnection.execute();

    return response.json({ connections });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const student_id = request.user.id;
    const { teacher_id } = request.body;

    const createConnection = container.resolve(CreateConnectionService);

    const connection = await createConnection.execute({
      student_id,
      teacher_id,
    });
    return response.json(connection);
  }
}
