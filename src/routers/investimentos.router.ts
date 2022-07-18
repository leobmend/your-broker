import { Router } from 'express';

import investimentosController from '../controllers/investimentos.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware';

const investimentosRouter = Router();

investimentosRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  investimentosController.getByCliente,
);

export default investimentosRouter;
