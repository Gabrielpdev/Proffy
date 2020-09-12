import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import FavoriteController from '@modules/users/infra/http/controllers/FavoriteController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const favoriteRouter = Router();
const favoriteController = new FavoriteController();

favoriteRouter.use(ensureAuthenticated);

favoriteRouter.get('/', favoriteController.index);
favoriteRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
    },
  }),
  favoriteController.create,
);

export default favoriteRouter;
