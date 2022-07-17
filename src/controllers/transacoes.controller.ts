import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ITransacao } from '../interfaces/transacoes.interface';

import transacoesService from '../services/transacoes.service';

const getByCliente = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;

  const transacoes = await transacoesService.getByCliente(parseInt(codCliente as string, 10));

  return res.status(StatusCodes.CREATED).json(transacoes);
};

const deposito = async (req: Request, res: Response): Promise<Response> => {
  const newTransacao = await transacoesService.createDeposito(req.body as ITransacao);

  return res.status(StatusCodes.CREATED).json(newTransacao);
};

const saque = async (req: Request, res: Response): Promise<Response> => {
  const newTransacao = await transacoesService.createSaque(req.body as ITransacao);

  return res.status(StatusCodes.CREATED).json(newTransacao);
};

const transacoesController = {
  getByCliente,
  deposito,
  saque,
};

export default transacoesController;
