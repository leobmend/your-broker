import { Router } from 'express';

import ativosController from '../controllers/ativos.controller';

const ativosRouter = Router();

ativosRouter.get(
  '/',
  ativosController.getBySearch,
);

ativosRouter.get(
  '/:codAtivo',
  ativosController.getByCod,
);

export default ativosRouter;
