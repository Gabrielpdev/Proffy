import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDaysService from '@modules/schedule/services/ListDaysService';

export default class DaysController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listDays = container.resolve(ListDaysService);

    const days = await listDays.execute();

    return response.json(days);
  }
}
