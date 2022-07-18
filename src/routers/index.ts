import express from 'express';

import ativosRouter from './ativos.router';
import clientesRouter from './clientes.router';
import credenciaisRouter from './credenciais.router';
import investimentosRouter from './investimentos.router';
import operacoesRouter from './operacoes.router';
import transacoesRouter from './transacoes.router';

const router = express.Router();

router.use('/credenciais', credenciaisRouter);
router.use('/clientes', clientesRouter);
router.use('/ativos', ativosRouter);
router.use('/investimentos', investimentosRouter);
router.use('/transacoes', transacoesRouter);
router.use('/operacoes', operacoesRouter);

export default router;
