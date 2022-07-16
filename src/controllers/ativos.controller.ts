import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ativosService from '../services/ativos.service';

const getAtivos = async (_req: Request, res: Response): Promise<Response> => {
  const ativos = await ativosService.getAll();
  return res.status(StatusCodes.OK).json(ativos);
};

const ativosController = {
  getAtivos,
};

export default ativosController;
