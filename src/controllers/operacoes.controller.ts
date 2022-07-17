import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import operacoesService from '../services/operacoes.service';

const getByCliente = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const operacoes = await operacoesService.getByCliente(parseInt(codCliente as string, 10));

  return res.status(StatusCodes.CREATED).json(operacoes);
};

const comprar = async (req: Request, res: Response): Promise<Response> => {
  const newOperacao = await operacoesService.createCompra(req.body);

  return res.status(StatusCodes.CREATED).json(newOperacao);
};

const vender = async (req: Request, res: Response): Promise<Response> => {
  const newOperacao = await operacoesService.createVenda(req.body);

  return res.status(StatusCodes.CREATED).json(newOperacao);
};

const operacoesController = {
  getByCliente,
  comprar,
  vender,
};

export default operacoesController;
