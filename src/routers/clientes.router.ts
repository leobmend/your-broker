import { Router } from 'express';

import clientesController from '../controllers/clientes.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';

const clientesRouter = Router();

clientesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  clientesController.getByCod,
);

export default clientesRouter;
