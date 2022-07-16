import { StatusCodes } from 'http-status-codes';

import Cliente from '../database/models/clientes.model';
import { ICliente } from '../interfaces/clientes.interface';
import HttpError from '../utils/HttpError';

const getAll = async (): Promise<ICliente[]> => {
  const clientes = await Cliente.findAll();
  return clientes;
};

const create = async (cliente: Omit<ICliente, 'codCliente'>): Promise<ICliente> => {
  const clienteByNome = await Cliente.findOne({ where: { email: cliente.email } });
  if (clienteByNome) throw new HttpError(StatusCodes.CONFLICT, 'Já existe cliente cadastrado com este e-mail');

  const newCliente = await Cliente.create(cliente);
  return newCliente;
};

const clientesService = {
  getAll,
  create,
};

export default clientesService;
