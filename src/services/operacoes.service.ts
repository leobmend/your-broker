import { StatusCodes } from 'http-status-codes';

import { ICliente } from '../interfaces/clientes.interface';
import { IAtivo } from '../interfaces/ativos.interface';
import { IOperacao } from '../interfaces/operacoes.interface';
import { IGetCotacaoReturn } from '../interfaces/b3.API.interface';

import clientesService from './clientes.service';
import ativosService from './ativos.service';
import investimentosService from './investimentos.service';
import Operacao from '../database/models/operacoes.model';
import { getCotacao } from '../external/b3.API.model';

import HttpError from '../utils/HttpError';

const getAll = async (): Promise<IOperacao[]> => {
  const operacoes = await Operacao.findAll();
  return operacoes;
};

const getByCliente = async (codCliente: number): Promise<IOperacao[] | void> => {
  await clientesService.getByCod(codCliente);

  const operacoes = await Operacao.findAll({ where: { codCliente } });
  if (!operacoes.length) throw new HttpError(StatusCodes.NOT_FOUND, 'Nenhuma operação encontrada');

  return operacoes;
};

const createCompra = async (operacao: Omit<IOperacao, 'codOperacao'|'valor'>): Promise<IOperacao> => {
  const cliente = await clientesService.getByCod(operacao.codCliente) as ICliente;
  const ativo = await ativosService.getByCod(operacao.codAtivo) as IAtivo;

  if (ativo.qtdeAtivo < operacao.qtdeAtivo) {
    throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Quantidade insuficiente de ativos disponíveis para compra');
  }

  const { valor } = await getCotacao(ativo.codAtivoB3) as IGetCotacaoReturn;
  const newSaldo = cliente.saldo - valor * operacao.qtdeAtivo;

  if (newSaldo < 0) {
    throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Saldo insuficiente para realizar compra');
  }

  await clientesService.updateSaldo(operacao.codCliente, newSaldo);

  const investimento = await investimentosService.getByCod(operacao.codCliente, operacao.codAtivo);
  const codigos = { codCliente: operacao.codCliente, codAtivo: operacao.codAtivo };

  if (!investimento) {
    await investimentosService.create(
      { ...codigos, qtdeAtivo: operacao.qtdeAtivo },
    );
  } else {
    await investimentosService.updateQtde(
      { ...codigos, qtdeAtivo: investimento.qtdeAtivo + operacao.qtdeAtivo },
    );
  }

  const newOperacao = await Operacao.create({ ...operacao, valor });
  return newOperacao;
};

const createVenda = async (operacao: Omit<IOperacao, 'codOperacao'|'valor'>): Promise<IOperacao> => {
  const cliente = await clientesService.getByCod(operacao.codCliente) as ICliente;
  const ativo = await ativosService.getByCod(operacao.codAtivo) as IAtivo;
  const investimento = await investimentosService.getByCod(operacao.codCliente, operacao.codAtivo);

  if (!investimento) throw new HttpError(StatusCodes.NOT_FOUND, 'Investimento prévio não encontrado');

  if (investimento.qtdeAtivo < operacao.qtdeAtivo) {
    throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Quantidade insuficiente de ativos disponíveis para venda');
  }

  const { valor } = await getCotacao(ativo.codAtivoB3) as IGetCotacaoReturn;
  const newSaldo = cliente.saldo + valor * operacao.qtdeAtivo;

  await clientesService.updateSaldo(operacao.codCliente, newSaldo);

  const newInvestimento = {
    codCliente: operacao.codCliente,
    codAtivo: operacao.codAtivo,
    qtdeAtivo: investimento.qtdeAtivo - operacao.qtdeAtivo,
  };

  await investimentosService.updateQtde(newInvestimento);

  const newOperacao = await Operacao.create({ ...operacao, valor: -1 * valor });
  return newOperacao;
};

const transacoesService = {
  getAll,
  getByCliente,
  createCompra,
  createVenda,
};

export default transacoesService;
