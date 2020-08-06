import { Request, Response } from 'express';
import db from '../database/connection';

export default class TeacherController {
  async index(request: Request, response: Response) {
    const totalConnections = await db('users')
      .count('* as total')
      .where('is_teacher', 1);

    const { total } = totalConnections[0];

    return response.json({ total });
  }
}
