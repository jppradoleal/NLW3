import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesController from './Controllers/OrphanagesController'
import UsersController from './Controllers/UsersController';
import AuthController from './Controllers/AuthController';
import PrivateOrphanagesController from './Controllers/PrivateOrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);

//Private Orphanages
routes.post('/orphanages/approve', 
  AuthController.authenticate,
  PrivateOrphanagesController.approveOrphanage);

routes.get('/orphanages/dashboard', 
              AuthController.authenticate, 
              PrivateOrphanagesController.index);
              
routes.get('/orphanages/dashboard/:id', 
            AuthController.authenticate,
            PrivateOrphanagesController.show);

routes.delete('/orphanages/delete', AuthController.authenticate, OrphanagesController.delete);
routes.put('/orphanages/update', 
            AuthController.authenticate,
            OrphanagesController.update);

routes.get('/orphanages/:id', OrphanagesController.show);

routes.post('/signup', UsersController.create);

routes.post('/login', AuthController.login);
routes.post('/forgot_password', AuthController.forgotPassword);
routes.post('/reset_password', AuthController.resetPassword);

export default routes;