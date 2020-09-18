import { Router } from 'express';
import SubjectsController from '@modules/schedule/infra/http/controllers/SubjectsController';

const subjectsRouter = Router();
const subjectsController = new SubjectsController();

subjectsRouter.get('/', subjectsController.index);

export default subjectsRouter;
