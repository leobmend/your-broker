import { Router } from 'express';
import clientesController from '../controllers/clientes.controller';

const clientesRouter = Router();

clientesRouter.get(
  '/:codCliente',
  clientesController.getByCod,
);

export default clientesRouter;
