import { Router } from 'express';
import DaysController from '@modules/schedule/infra/http/controllers/DaysController';

const dayRouter = Router();
const daysController = new DaysController();

dayRouter.get('/', daysController.index);

export default dayRouter;
