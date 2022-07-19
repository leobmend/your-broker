import { StatusCodes } from 'http-status-codes';

import { ICliente, IPostCliente, IPostLogin } from '../interfaces/clientes.interface';

import Cliente from '../database/models/clientes.model';

import bcryptUtils from '../utils/bcrypt.util';
import HttpError from '../utils/HttpError';
import jwtUtils from '../utils/jwt.util';

const getByCod = async (codCliente: number): Promise<ICliente> => {
  const cliente = await Cliente.findByPk(
    codCliente,
    { attributes: { exclude: ['senha'] } },
  );

  if (!cliente) throw new HttpError(StatusCodes.NOT_FOUND, 'Cliente não encontrado');

  return cliente;
};

const create = async (cliente: IPostCliente): Promise<string> => {
  const clienteByEmail = await Cliente.findOne(
    { where: { email: cliente.email }, attributes: { exclude: ['senha'] } },
  );
  if (clienteByEmail) {
    throw new HttpError(StatusCodes.CONFLICT, 'Já existe cliente cadastrado com este e-mail');
  }

  const clienteToInsert = {
    ...cliente,
    saldo: 0,
    senha: await bcryptUtils.hashPassword(cliente.senha),
  };

  const newCliente = await Cliente.create(clienteToInsert);
  const jwtToken = jwtUtils.generateToken(newCliente.codCliente);

  return jwtToken;
};

const authenticate = async (login: IPostLogin): Promise<string> => {
  const clienteByEmail = await Cliente.findOne({ where: { email: login.email } });
  if (!clienteByEmail) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Cadastro não encontrado');
  }

  const isValid = await bcryptUtils.comparePassword(login.senha, clienteByEmail.senha);
  if (!isValid) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, 'Senha incorreta');
  }

  const jwtToken = jwtUtils.generateToken(clienteByEmail.codCliente);

  return jwtToken;
};

const updateSaldo = async (codCliente: number, saldo: number): Promise<void> => {
  await getByCod(codCliente);
  await Cliente.update({ saldo }, { where: { codCliente } });
};

const clientesService = {
  getByCod,
  create,
  authenticate,
  updateSaldo,
};

export default clientesService;
