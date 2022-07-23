import { Router } from 'express';

import clientesController from '../controllers/clientes.controller';
import investimentosController from '../controllers/investimentos.controller';
import operacoesController from '../controllers/operacoes.controller';
import transacoesController from '../controllers/transacoes.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import { clientePatchValidationMiddleware } from '../middlewares/credenciais.validations.middleware';
import operacaoValidationMiddleware from '../middlewares/operacoes.validations.middleware';
import transacaoValidationMiddleware from '../middlewares/transacoes.validations.middleware';

const clientesRouter = Router();

clientesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  authorizationMiddleware,
  clientesController.getByCod,
);

clientesRouter.patch(
  '/:codCliente',
  authenticationMiddleware,
  authorizationMiddleware,
  clientePatchValidationMiddleware,
  clientesController.editProfile,
);

clientesRouter.get(
  '/:codCliente/investimentos',
  authenticationMiddleware,
  authorizationMiddleware,
  investimentosController.getByCliente,
);

clientesRouter.get(
  '/:codCliente/transacoes',
  authenticationMiddleware,
  authorizationMiddleware,
  transacoesController.getByCliente,
);

clientesRouter.get(
  '/:codCliente/operacoes',
  authenticationMiddleware,
  authorizationMiddleware,
  operacoesController.getByCliente,
);

clientesRouter.post(
  '/:codCliente/transacoes/',
  authenticationMiddleware,
  authorizationMiddleware,
  transacaoValidationMiddleware,
  transacoesController.create,
);

clientesRouter.post(
  '/:codCliente/operacoes/',
  authenticationMiddleware,
  authorizationMiddleware,
  operacaoValidationMiddleware,
  operacoesController.create,
);

export default clientesRouter;
