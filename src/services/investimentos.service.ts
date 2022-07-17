import { StatusCodes } from 'http-status-codes';

import { IInvestimento } from '../interfaces/investimentos.interface';

import clientesService from './clientes.service';
import Investimento from '../database/models/investimentos.model';

import HttpError from '../utils/HttpError';

const getByCod = async (codCliente: number, codAtivo: number): Promise<IInvestimento | null> => {
  const investimento = await Investimento.findOne({ where: { codCliente, codAtivo } });
  return investimento;
};

const getByCliente = async (codCliente: number): Promise<IInvestimento[] | void> => {
  await clientesService.getByCod(codCliente);

  const investimentos = await Investimento.findAll({ where: { codCliente } });
  if (!investimentos.length) throw new HttpError(StatusCodes.NOT_FOUND, 'Nenhum investimento encontrado');

  return investimentos;
};

const create = async (investimento: Omit<IInvestimento, ''>): Promise<IInvestimento> => {
  const newInvestimento = await Investimento.create(investimento);
  return newInvestimento;
};

const updateQtde = async (investimento: IInvestimento): Promise<void> => {
  const { codCliente, codAtivo, qtdeAtivo } = investimento;
  await Investimento.update({ qtdeAtivo }, { where: { codCliente, codAtivo } });
};

const investimentosService = {
  getByCod,
  getByCliente,
  create,
  updateQtde,
};

export default investimentosService;
