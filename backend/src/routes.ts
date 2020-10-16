import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './Controllers/OrphanagesController'
import UsersController from './Controllers/UsersController';
import * as LoginController from './Controllers/LoginController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages', LoginController.authenticate, upload.array('images'), OrphanagesController.create);

routes.post('/signup', UsersController.create);

routes.post('/login', LoginController.login);

export default routes;