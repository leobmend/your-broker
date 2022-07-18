import { Router } from 'express';

import operacoesController from '../controllers/operacoes.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';

const operacoesRouter = Router();

operacoesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  operacoesController.getByCliente,
);

operacoesRouter.post(
  '/comprar',
  authenticationMiddleware,
  operacoesController.comprar,
);

operacoesRouter.post(
  '/vender',
  authenticationMiddleware,
  operacoesController.vender,
);

export default operacoesRouter;
