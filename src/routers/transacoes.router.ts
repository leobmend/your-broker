import { Router } from 'express';

import transacoesController from '../controllers/transacoes.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import transacaoValidationMiddleware from '../middlewares/transacoes.validations.middleware';

const transacoesRouter = Router();

transacoesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  transacoesController.getByCliente,
);

transacoesRouter.post(
  '/deposito',
  authenticationMiddleware,
  transacaoValidationMiddleware,
  transacoesController.deposito,
);

transacoesRouter.post(
  '/saque',
  authenticationMiddleware,
  transacaoValidationMiddleware,
  transacoesController.saque,
);

export default transacoesRouter;
