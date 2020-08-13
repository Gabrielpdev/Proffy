import { Request, Response } from 'express';
import db from '../database/connection';

export default class FavoriteController {
  async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const favorites = await db('favorites').where('user_id', user_id);

    return response.json(favorites);
  }

  async create(request: Request, response: Response) {
    const user_id = request.user.id;
    const { proffy_id } = request.body;

    if (user_id === proffy_id) {
      return response.status(400).json({ error: "You can't favor yourself" });
    }

    await db('favorites')
      .insert({
        user_id,
        proffy_id,
      })
      .into('favorites');

    const favorites = await db('favorites').where('user_id', user_id).first();

    return response.json(favorites);
  }
}
