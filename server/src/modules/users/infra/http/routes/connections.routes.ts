import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ConnectionController from '@modules/users/infra/http/controllers/ConnectionController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const connectionsRouter = Router();
const connectionController = new ConnectionController();

connectionsRouter.get('/', connectionController.index);

connectionsRouter.use(ensureAuthenticated);

connectionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      teacher_id: Joi.string().required(),
    },
  }),
  connectionController.create,
);

export default connectionsRouter;
