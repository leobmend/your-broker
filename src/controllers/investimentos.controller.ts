import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import investimentosService from '../services/investimentos.service';

const getByCliente = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const investimentos = await investimentosService.getByCliente(parseInt(codCliente as string, 10));

  return res.status(StatusCodes.CREATED).json(investimentos);
};

const investimentosController = {
  getByCliente,
};

export default investimentosController;
