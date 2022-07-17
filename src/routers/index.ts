import express from 'express';

import ativosRouter from './ativos.router';
import clientesRouter from './clientes.router';
import investimentosRouter from './investimentos.router';
import transacoesRouter from './transacoes.router';

const router = express.Router();

router.use('/clientes', clientesRouter);
router.use('/ativos', ativosRouter);
router.use('/investimentos', investimentosRouter);
router.use('/transacoes', transacoesRouter);

export default router;
