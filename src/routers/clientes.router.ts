import { Router } from 'express';

import clientesController from '../controllers/clientes.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const clientesRouter = Router();

clientesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  authorizationMiddleware,
  clientesController.getByCod,
);

export default clientesRouter;
