import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { ITransacao } from '../interfaces/transacoes.interface';

import transacoesService from '../services/transacoes.service';

const getByCliente = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;

  const transacoes = await transacoesService.getByCliente(parseInt(codCliente as string, 10));

  return res.status(StatusCodes.OK).json({ data: transacoes });
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const { tipo, valor } = req.body;

  const transacao = {
    codCliente: parseInt(codCliente, 10),
    valor,
  };

  let newTransacao: ITransacao;
  if (tipo === 'deposito') {
    newTransacao = await transacoesService.createDeposito(transacao);
  } else {
    newTransacao = await transacoesService.createSaque(transacao);
  }

  return res.status(StatusCodes.CREATED).json({ data: newTransacao });
};

const transacoesController = {
  getByCliente,
  create,
};

export default transacoesController;
