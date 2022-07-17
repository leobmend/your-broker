import { StatusCodes } from 'http-status-codes';

import { ICliente } from '../interfaces/clientes.interface';
import { ITransacao } from '../interfaces/transacoes.interface';

import clientesService from './clientes.service';
import Transacao from '../database/models/transacoes.model';

import HttpError from '../utils/HttpError';

const getAll = async (): Promise<ITransacao[]> => {
  const transacoes = await Transacao.findAll();
  return transacoes;
};

const getByCliente = async (codCliente: number): Promise<ITransacao[] | void> => {
  await clientesService.getByCod(codCliente);

  const transacoes = await Transacao.findAll({ where: { codCliente } });
  if (!transacoes.length) throw new HttpError(StatusCodes.NOT_FOUND, 'Nenhuma transacao encontrada');

  return transacoes;
};

const createDeposito = async (transacao: Omit<ITransacao, 'codTransacao'|'data'>): Promise<ITransacao> => {
  const cliente = await clientesService.getByCod(transacao.codCliente) as ICliente;

  const newSaldo = cliente.saldo + transacao.valor;
  await clientesService.updateSaldo(transacao.codCliente, newSaldo);

  const newTransacao = await Transacao.create(transacao) as ITransacao;

  return newTransacao;
};

const createSaque = async (transacao: Omit<ITransacao, 'codTransacao'|'data'>): Promise<ITransacao> => {
  const cliente = await clientesService.getByCod(transacao.codCliente) as ICliente;

  const newSaldo = cliente.saldo - transacao.valor;
  if (newSaldo < 0) throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Saldo insuficiente');
  await clientesService.updateSaldo(transacao.codCliente, newSaldo);

  const newTransacao = await Transacao.create(
    { ...transacao, valor: -1 * transacao.valor },
  ) as ITransacao;

  return newTransacao;
};

const transacoesService = {
  getAll,
  getByCliente,
  createDeposito,
  createSaque,
};

export default transacoesService;
