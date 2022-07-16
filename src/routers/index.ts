import express from 'express';
import ativosRouter from './ativos.router';

const router = express.Router();

router.use('/ativos', ativosRouter);

export default router;
