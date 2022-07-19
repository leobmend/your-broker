import express from 'express';

import ativosRouter from './ativos.router';
import clientesRouter from './clientes.router';
import credenciaisRouter from './credenciais.router';

const router = express.Router();

router.use('/credenciais', credenciaisRouter);
router.use('/clientes', clientesRouter);
router.use('/ativos', ativosRouter);

export default router;
