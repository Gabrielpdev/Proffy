import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClassesController from '@modules/classes/infra/http/controllers/ClassesController';

const classRouter = Router();
const classesController = new ClassesController();

classRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      subject: Joi.string().required(),
      cost: Joi.number().required(),
      schedule: Joi.array().required(),
    },
  }),
  classesController.create,
);

export default classRouter;
