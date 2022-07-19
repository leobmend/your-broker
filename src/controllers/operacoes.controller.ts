import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IOperacao } from '../interfaces/operacoes.interface';

import operacoesService from '../services/operacoes.service';

const getByCliente = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const operacoes = await operacoesService.getByCliente(parseInt(codCliente as string, 10));

  return res.status(StatusCodes.OK).json({ data: operacoes });
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const { tipo, codAtivo, qtdeAtivo } = req.body;

  const operacao = {
    codCliente: parseInt(codCliente, 10),
    codAtivo,
    qtdeAtivo,
  };

  let newOperacao: IOperacao;
  if (tipo === 'compra') {
    newOperacao = await operacoesService.createCompra(operacao);
  } else {
    newOperacao = await operacoesService.createVenda(operacao);
  }

  return res.status(StatusCodes.CREATED).json({ data: newOperacao });
};

const operacoesController = {
  getByCliente,
  create,
};

export default operacoesController;
