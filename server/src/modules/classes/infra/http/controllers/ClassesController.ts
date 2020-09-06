import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClassService from '@modules/classes/services/CreateClassService';

export default class ClassesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { subject_id, cost, schedule } = request.body;

    const createClass = container.resolve(CreateClassService);

    const classe = await createClass.execute({
      subject_id,
      cost,
      schedule,
      user_id,
    });

    return response.json(classe);
  }
}
