import { StatusCodes } from 'http-status-codes';

import Ativo from '../database/models/ativos.model';
import { IAtivo } from '../interfaces/ativos.interface';
import HttpError from '../utils/HttpError';

const getAll = async (): Promise<IAtivo[]> => {
  const ativos = await Ativo.findAll();
  return ativos;
};

const getByCodB3 = async (codAtivoB3: string): Promise<IAtivo | null> => {
  const ativo = await Ativo.findOne({ where: { codAtivoB3 } });
  return ativo;
};

const create = async (ativo: Omit<IAtivo, 'codAtivo'>): Promise<IAtivo> => {
  const ativoByCodB3 = await getByCodB3(ativo.codAtivoB3);
  if (ativoByCodB3) throw new HttpError(StatusCodes.CONFLICT, 'Já existe ativo com este código B3');

  const newAtivo = await Ativo.create(ativo);
  return newAtivo;
};

const ativosService = {
  getAll,
  create,
};

export default ativosService;
