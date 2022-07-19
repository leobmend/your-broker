import { Router } from 'express';

import investimentosController from '../controllers/investimentos.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const investimentosRouter = Router();

investimentosRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  authorizationMiddleware,
  investimentosController.getByCliente,
);

export default investimentosRouter;
