import { Router } from 'express';
import investimentosController from '../controllers/investimentos.controller';

const investimentosRouter = Router();

investimentosRouter.get(
  '/:codCliente',
  investimentosController.getByCliente,
);

export default investimentosRouter;
