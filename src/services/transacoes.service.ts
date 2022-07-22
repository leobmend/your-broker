import { StatusCodes } from 'http-status-codes';

import { ICliente } from '../interfaces/clientes.interface';
import { IPostTransacaoFull, ITransacao } from '../interfaces/transacoes.interface';

import clientesService from './clientes.service';
import Transacao from '../database/models/transacoes.model';

import HttpError from '../utils/HttpError';

const getByCliente = async (codCliente: number): Promise<ITransacao[]> => {
  await clientesService.getByCod(codCliente);

  const transacoes = await Transacao.findAll({ where: { codCliente } });

  return transacoes;
};

const createDeposito = async (transacao: IPostTransacaoFull): Promise<ITransacao> => {
  const cliente = await clientesService.getByCod(transacao.codCliente) as ICliente;

  const newSaldo = cliente.saldo + transacao.valor;
  await clientesService.updateSaldo(transacao.codCliente, newSaldo);

  const newTransacao = await Transacao.create({ ...transacao });

  return newTransacao;
};

const createSaque = async (transacao: IPostTransacaoFull): Promise<ITransacao> => {
  const cliente = await clientesService.getByCod(transacao.codCliente) as ICliente;

  const newSaldo = cliente.saldo - transacao.valor;
  if (newSaldo < 0) throw new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, 'Saldo insuficiente');
  await clientesService.updateSaldo(transacao.codCliente, newSaldo);

  const newTransacao = await Transacao.create({ ...transacao });

  return newTransacao;
};

const transacoesService = {
  getByCliente,
  createDeposito,
  createSaque,
};

export default transacoesService;
