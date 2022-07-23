import { StatusCodes } from 'http-status-codes';

import {
  ICliente, IPatchCliente, IPostCliente, IPostLogin,
} from '../interfaces/clientes.interface';

import Cliente from '../database/models/clientes.model';

import bcryptUtils from '../utils/bcrypt.util';
import HttpError from '../utils/HttpError';
import jwtUtils from '../utils/jwt.util';

const checkIfEmailExists = async (email: string): Promise<void> => {
  const clienteByEmail = await Cliente.findOne(
    { where: { email }, attributes: { exclude: ['senha'] } },
  );

  if (clienteByEmail) {
    throw new HttpError(StatusCodes.BAD_REQUEST, 'Cadastro inválido');
  }
};

const getByCod = async (codCliente: number): Promise<ICliente> => {
  const cliente = await Cliente.findByPk(
    codCliente,
    { attributes: { exclude: ['senha'] } },
  );

  if (!cliente) throw new HttpError(StatusCodes.NOT_FOUND, 'Cliente não encontrado');

  return cliente;
};

const create = async (cliente: IPostCliente): Promise<string> => {
  await checkIfEmailExists(cliente.email);

  const clienteToInsert = {
    ...cliente,
    saldo: 0,
    senha: await bcryptUtils.hashPassword(cliente.senha),
  };

  const newCliente = await Cliente.create(clienteToInsert);
  const jwtToken = jwtUtils.generateToken(newCliente.codCliente);

  return jwtToken;
};

const editProfile = async (codCliente: number, cliente: IPostCliente): Promise<ICliente> => {
  const oldCliente = await getByCod(codCliente);

  const patchCliente: IPatchCliente = {};

  if (cliente.nome) {
    patchCliente.nome = cliente.nome;
  }
  if (cliente.email) {
    patchCliente.email = cliente.email;

    if (cliente.email !== oldCliente.email) await checkIfEmailExists(cliente.email);
  }
  if (cliente.senha) {
    patchCliente.senha = await bcryptUtils.hashPassword(cliente.senha);
  }

  await Cliente.update(
    patchCliente,
    { where: { codCliente } },
  );

  const editedCliente = {
    codCliente,
    nome: patchCliente.nome || oldCliente.nome,
    email: patchCliente.email || oldCliente.email,
    saldo: oldCliente.saldo,
  };

  return editedCliente;
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
  editProfile,
  authenticate,
  updateSaldo,
};

export default clientesService;
