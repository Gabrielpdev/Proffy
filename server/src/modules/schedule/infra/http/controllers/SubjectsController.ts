import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListSubjectsService from '@modules/schedule/services/ListSubjectsService';

export default class SubjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSubjects = container.resolve(ListSubjectsService);

    const subjects = await listSubjects.execute();

    return response.json(subjects);
  }
}
