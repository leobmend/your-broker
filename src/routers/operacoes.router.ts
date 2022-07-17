import { Router } from 'express';
import operacoesController from '../controllers/operacoes.controller';

const operacoesRouter = Router();

operacoesRouter.get(
  '/:codCliente',
  operacoesController.getByCliente,
);

operacoesRouter.post(
  '/comprar',
  operacoesController.comprar,
);

operacoesRouter.post(
  '/vender',
  operacoesController.vender,
);

export default operacoesRouter;
