import { StatusCodes } from 'http-status-codes';

import { IGetInvestimento, IInvestimento } from '../interfaces/investimentos.interface';
import { IGetCotacaoReturn } from '../interfaces/b3.API.interface';

import clientesService from './clientes.service';
import Investimento from '../database/models/investimentos.model';
import { getCotacao } from '../external/b3.API.model';

import HttpError from '../utils/HttpError';

const getByCod = async (codCliente: number, codAtivo: string): Promise<IInvestimento | null> => {
  const investimento = await Investimento.findOne({ where: { codCliente, codAtivo } });
  return investimento;
};

const getByCliente = async (codCliente: number): Promise<IGetInvestimento[]> => {
  await clientesService.getByCod(codCliente);

  const investimentos = await Investimento.findAll({ where: { codCliente } });
  if (!investimentos.length) throw new HttpError(StatusCodes.NOT_FOUND, 'Nenhum investimento encontrado');

  const promises = investimentos.map(
    async (investimento: IInvestimento): Promise<IGetInvestimento> => {
      const { valor } = await getCotacao(investimento.codAtivo) as IGetCotacaoReturn;

      const investimentoWithValor = {
        codCliente: investimento.codCliente,
        codAtivo: investimento.codAtivo,
        qtdeAtivo: investimento.qtdeAtivo,
        valor,
      };

      return investimentoWithValor;
    },
  );

  const investimentosWithValor = await Promise.all(promises);
  return investimentosWithValor;
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
