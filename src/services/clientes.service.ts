import { StatusCodes } from 'http-status-codes';

import { ICliente } from '../interfaces/clientes.interface';

import Cliente from '../database/models/clientes.model';

import HttpError from '../utils/HttpError';

const getAll = async (): Promise<ICliente[]> => {
  const clientes = await Cliente.findAll();
  return clientes;
};

const getByCod = async (codCliente: number): Promise<ICliente | void> => {
  const cliente = await Cliente.findByPk(codCliente);

  if (!cliente) throw new HttpError(StatusCodes.NOT_FOUND, 'Cliente não encontrado');

  return cliente;
};

const create = async (cliente: Omit<ICliente, 'codCliente'>): Promise<ICliente> => {
  const clienteByNome = await Cliente.findOne({ where: { email: cliente.email } });
  if (clienteByNome) throw new HttpError(StatusCodes.CONFLICT, 'Já existe cliente cadastrado com este e-mail');

  const newCliente = await Cliente.create(cliente);
  return newCliente;
};

const updateSaldo = async (codCliente: number, saldo: number): Promise<void> => {
  await Cliente.update({ saldo }, { where: { codCliente } });
};

const clientesService = {
  getAll,
  getByCod,
  create,
  updateSaldo,
};

export default clientesService;
