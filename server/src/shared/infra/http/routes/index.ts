import express from 'express';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import classesRouter from '@modules/classes/infra/http/routes/classes.routes';
import connectionRouter from '@modules/users/infra/http/routes/connections.routes';
import favoriteRouter from '@modules/users/infra/http/routes/favorites.routes';
import teacherRouter from '@modules/users/infra/http/routes/teachers.routes';
import dayRouter from '@modules/schedule/infra/http/routes/days.routes';

const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/password', passwordRouter);
routes.use('/sessions', sessionRouter);
routes.use('/profile', profileRouter);
routes.use('/classes', classesRouter);
routes.use('/connection', connectionRouter);
routes.use('/favorite', favoriteRouter);
routes.use('/teacher', teacherRouter);
routes.use('/days', dayRouter);

export default routes;
