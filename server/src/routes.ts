import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionsController';
import UserController from './controllers/UserController';
import TeacherController from './controllers/TeacherController';
import SessionsController from './controllers/SessionsController';
import FavoriteController from './controllers/FavoriteController';

import ensureAuthenticated from './middleware/auth';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const userController = new UserController();
const sessionsController = new SessionsController();
const teacherController = new TeacherController();
const favoriteController = new FavoriteController();

routes.post('/users', userController.create);
routes.get('/users', userController.index);
routes.get('/teachers', teacherController.index);

routes.post('/sessions', sessionsController.create);

routes.get('/connections', connectionsController.index);

routes.post('/classes', ensureAuthenticated, classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', ensureAuthenticated, connectionsController.create);

routes.get('/favorites', ensureAuthenticated, favoriteController.index);
routes.post('/favorites', ensureAuthenticated, favoriteController.create);

routes.put('/users', ensureAuthenticated, userController.update);

export default routes;
