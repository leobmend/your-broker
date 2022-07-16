import { Router } from 'express';
import ativosController from '../controllers/ativos.controller';

const ativosRouter = Router();

ativosRouter.get(
  '/',
  ativosController.getAtivos,
);

export default ativosRouter;
