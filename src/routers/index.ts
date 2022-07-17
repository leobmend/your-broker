import express from 'express';
import ativosRouter from './ativos.router';
import clientesRouter from './clientes.router';
import transacoesRouter from './transacoes.router';

const router = express.Router();

router.use('/clientes', clientesRouter);
router.use('/ativos', ativosRouter);
router.use('/conta', transacoesRouter);

export default router;
