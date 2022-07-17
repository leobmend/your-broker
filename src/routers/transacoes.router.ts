import { Router } from 'express';
import transacoesController from '../controllers/transacoes.controller';

const transacoesRouter = Router();

transacoesRouter.get(
  '/:codCliente',
  transacoesController.getByCliente,
);

transacoesRouter.post(
  '/deposito',
  transacoesController.deposito,
);

transacoesRouter.post(
  '/saque',
  transacoesController.saque,
);

export default transacoesRouter;
