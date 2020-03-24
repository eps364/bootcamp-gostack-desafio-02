import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Aplicação Rodando perfeitamente!' });
});

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/sessions', SessionController.getUserCurrent);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:idRecipient', RecipientController.show);
routes.put('/recipients/:idRecipient', RecipientController.update);
routes.delete('/recipients/:idRecipient', RecipientController.delete);

export default routes;
