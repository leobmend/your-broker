import { Router } from 'express';

import transacoesController from '../controllers/transacoes.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';

const transacoesRouter = Router();

transacoesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  transacoesController.getByCliente,
);

transacoesRouter.post(
  '/deposito',
  authenticationMiddleware,
  transacoesController.deposito,
);

transacoesRouter.post(
  '/saque',
  authenticationMiddleware,
  transacoesController.saque,
);

export default transacoesRouter;
