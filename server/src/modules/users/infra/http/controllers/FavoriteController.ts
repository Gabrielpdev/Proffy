import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateFavoriteService from '@modules/users/services/CreateFavoriteService';
import ListFavoritesService from '@modules/users/services/ListFavoritesService';
import DeleteFavoriteService from '@modules/users/services/DeleteFavoriteService';

export default class FavoriteController {
  public async index(request: Request, response: Response): Promise<Response> {
    const student_id = request.user.id;
    const listFavorites = container.resolve(ListFavoritesService);

    const favorites = await listFavorites.execute(student_id);

    return response.json(classToClass(favorites));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const student_id = request.user.id;
    const { class_id } = request.body;

    const createFavorite = container.resolve(CreateFavoriteService);

    const favorites = await createFavorite.execute({
      student_id,
      class_id,
    });

    return response.json(favorites);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { id } = request.params;

    const deleteFavorite = container.resolve(DeleteFavoriteService);

    const favorites = await deleteFavorite.execute({ id, user_id });

    return response.json(favorites);
  }
}
