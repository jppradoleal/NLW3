import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './Controllers/OrphanagesController'
import UsersController from './Controllers/UsersController';
import AuthController from './Controllers/AuthController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', AuthController.authenticate, upload.array('images'), OrphanagesController.create);

routes.post('/signup', UsersController.create);

routes.post('/login', AuthController.login);
routes.post('/forgot_password', AuthController.forgotPassword);
routes.post('/reset_password', AuthController.resetPassword);

export default routes;