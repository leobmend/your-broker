import { Router } from 'express';

import operacoesController from '../controllers/operacoes.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import operacaoValidationMiddleware from '../middlewares/operacoes.validations.middleware';

const operacoesRouter = Router();

operacoesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  operacoesController.getByCliente,
);

operacoesRouter.post(
  '/comprar',
  authenticationMiddleware,
  operacaoValidationMiddleware,
  operacoesController.comprar,
);

operacoesRouter.post(
  '/vender',
  authenticationMiddleware,
  operacaoValidationMiddleware,
  operacoesController.vender,
);

export default operacoesRouter;
