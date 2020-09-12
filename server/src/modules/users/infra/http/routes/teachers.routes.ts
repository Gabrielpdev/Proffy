import { Router } from 'express';

import TeacherController from '@modules/users/infra/http/controllers/TeacherController';

const teachersRouter = Router();
const teacherController = new TeacherController();

teachersRouter.get('/', teacherController.index);

export default teachersRouter;
