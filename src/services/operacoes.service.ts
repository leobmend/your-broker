import { StatusCodes } from 'http-status-codes';

import { ICliente } from '../interfaces/clientes.interface';
import { IOperacao, IPostOperacao } from '../interfaces/operacoes.interface';

import clientesService from './clientes.service';
import ativosService from './ativos.service';
import investimentosService from './investimentos.service';
import Operacao from '../database/models/operacoes.model';

import HttpError from '../utils/HttpError';

const getByCliente = async (codCliente: number): Promise<IOperacao[]> => {
  await clientesService.getByCod(codCliente);

  const operacoes = await Operacao.findAll({ where: { codCliente } });
  if (!operacoes.length) throw new HttpError(StatusCodes.NOT_FOUND, 'Nenhuma operação encontrada');

  return operacoes;
};

const createCompra = async (operacao: IPostOperacao): Promise<IOperacao> => {
  const cliente = await clientesService.getByCod(operacao.codCliente) as ICliente;
  const ativo = await ativosService.getByCod(operacao.codAtivo);

  const newSaldo = cliente.saldo - ativo.valor * operacao.qtdeAtivo;
  const newQtdeAtivo = ativo.qtdeAtivo - operacao.qtdeAtivo;

  if (newQtdeAtivo < 0) {
    throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Quantidade insuficiente de ativos disponíveis para compra');
  }

  if (newSaldo < 0) {
    throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Saldo insuficiente para realizar compra');
  }

  const investimento = await investimentosService.getByCod(operacao.codCliente, operacao.codAtivo);
  const codigos = { codCliente: operacao.codCliente, codAtivo: operacao.codAtivo };

  if (!investimento) {
    await investimentosService.create(
      { ...codigos, qtdeAtivo: operacao.qtdeAtivo },
    );
  } else {
    const newQtdeInvestimento = investimento.qtdeAtivo + operacao.qtdeAtivo;
    await investimentosService.updateQtde(
      { ...codigos, qtdeAtivo: newQtdeInvestimento },
    );
  }

  await clientesService.updateSaldo(operacao.codCliente, newSaldo);
  await ativosService.updateQtde(operacao.codAtivo, newQtdeAtivo);

  const newOperacao = await Operacao.create({ ...operacao, valor: ativo.valor });
  return newOperacao;
};

const createVenda = async (operacao: IPostOperacao): Promise<IOperacao> => {
  const cliente = await clientesService.getByCod(operacao.codCliente);
  const ativo = await ativosService.getByCod(operacao.codAtivo);
  const investimento = await investimentosService.getByCod(operacao.codCliente, operacao.codAtivo);

  const newSaldo = cliente.saldo + ativo.valor * operacao.qtdeAtivo;
  const newQtdeInvestimento = investimento.qtdeAtivo - operacao.qtdeAtivo;
  const newQtdeAtivo = ativo.qtdeAtivo + operacao.qtdeAtivo;

  if (newQtdeInvestimento < 0) {
    throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Quantidade insuficiente de ativos disponíveis para venda');
  }

  const newInvestimento = {
    codCliente: operacao.codCliente,
    codAtivo: operacao.codAtivo,
    qtdeAtivo: newQtdeInvestimento,
  };

  await clientesService.updateSaldo(operacao.codCliente, newSaldo);
  await investimentosService.updateQtde(newInvestimento);
  await ativosService.updateQtde(operacao.codAtivo, newQtdeAtivo);

  const newOperacao = await Operacao.create(
    { ...operacao, valor: ativo.valor, qtdeAtivo: -operacao.qtdeAtivo },
  );
  return newOperacao;
};

const transacoesService = {
  getByCliente,
  createCompra,
  createVenda,
};

export default transacoesService;
