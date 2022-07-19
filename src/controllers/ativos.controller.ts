import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ativosService from '../services/ativos.service';

const getBySearch = async (req: Request, res: Response): Promise<Response> => {
  const { termo = '', ordenacao = 'asc', pag = '1' } = req.query;
  const ativos = await ativosService.getBySearch(
    termo as string,
    parseInt(pag as string, 10),
    ordenacao as string,
  );

  return res.status(StatusCodes.OK).json({ data: ativos });
};

const getByCod = async (req: Request, res: Response): Promise<Response> => {
  const { codAtivo } = req.params;
  const ativo = await ativosService.getByCod(codAtivo);

  return res.status(StatusCodes.OK).json({ data: ativo });
};

const ativosController = {
  getBySearch,
  getByCod,
};

export default ativosController;
