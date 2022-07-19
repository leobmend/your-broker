import { Router } from 'express';

import operacoesController from '../controllers/operacoes.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import operacaoValidationMiddleware from '../middlewares/operacoes.validations.middleware';

const operacoesRouter = Router();

operacoesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  authorizationMiddleware,
  operacoesController.getByCliente,
);

operacoesRouter.post(
  '/comprar',
  authenticationMiddleware,
  authorizationMiddleware,
  operacaoValidationMiddleware,
  operacoesController.comprar,
);

operacoesRouter.post(
  '/vender',
  authenticationMiddleware,
  authorizationMiddleware,
  operacaoValidationMiddleware,
  operacoesController.vender,
);

export default operacoesRouter;
