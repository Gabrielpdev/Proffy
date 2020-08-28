import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClassService from '@modules/classes/services/CreateClassService';

export default class ClassesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { subject, cost, schedule } = request.body;

    const createClass = container.resolve(CreateClassService);

    const classe = await createClass.execute({
      subject,
      cost,
      schedule,
    });

    return response.json(classe);
  }
}
