import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ClassesController from '@modules/classes/infra/http/controllers/ClassesController';

const classRouter = Router();
const classesController = new ClassesController();

classRouter.use(ensureAuthenticated);

classRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject_id: Joi.string().required(),
      cost: Joi.number().required(),
      schedule: Joi.array().required(),
    },
  }),
  classesController.create,
);

export default classRouter;
