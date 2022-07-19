import { Router } from 'express';

import transacoesController from '../controllers/transacoes.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import transacaoValidationMiddleware from '../middlewares/transacoes.validations.middleware';

const transacoesRouter = Router();

transacoesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  authorizationMiddleware,
  transacoesController.getByCliente,
);

transacoesRouter.post(
  '/deposito',
  authenticationMiddleware,
  authorizationMiddleware,
  transacaoValidationMiddleware,
  transacoesController.deposito,
);

transacoesRouter.post(
  '/saque',
  authenticationMiddleware,
  authorizationMiddleware,
  transacaoValidationMiddleware,
  transacoesController.saque,
);

export default transacoesRouter;
