import { Router } from 'express';
import clientesController from '../controllers/clientes.controller';

const clientesRouter = Router();

clientesRouter.get(
  '/',
  clientesController.getClientes,
);

export default clientesRouter;
