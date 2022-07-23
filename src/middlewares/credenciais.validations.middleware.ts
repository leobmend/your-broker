import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi, { ObjectSchema } from 'joi';

import { IPatchCliente, IPostCliente, IPostLogin } from '../interfaces/clientes.interface';

import HttpError from '../utils/HttpError';

const replaceNomePattern = /[^a-zA-Z áéíóúã]/g;
const emailPattern = /\w+([.]\w+)*@\w+([.]\w+)+/i;

const nomeSchema = Joi.string().min(3);
const emailSchema = Joi.string().regex(emailPattern);
const senhaSchema = Joi.string().min(6);

const sanitizeNome = (nome: string): string => nome.trim().replace(replaceNomePattern, '');
const trimEmail = (email: string): string => email.trim();

const loginSchema: ObjectSchema = Joi.object(
  {
    email: emailSchema.required(),
    senha: senhaSchema.required(),
  },
).messages(
  {
    'any.required': 'O campo {#label} é obrigatório',
    'string.pattern.base': 'O campo {#label} precisa ser um e-mail válido',
    'string.base': 'O campo {#label} precisa ser uma cadeia de caracteres',
    'string.min': 'O campo {#label} precisa possuir no mínimo {#limit} caracteres',
  },
);

export const loginValidationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const cliente: IPostLogin = req.body;
  const { error } = loginSchema.validate(cliente);

  if (error) throw new HttpError(StatusCodes.BAD_REQUEST, error.message);

  next();
};

const createAccountSchema: ObjectSchema = Joi.object(
  {
    nome: nomeSchema.required(),
    email: emailSchema.required(),
    senha: senhaSchema.required(),
  },
).messages(
  {
    'any.required': 'O campo {#label} é obrigatório',
    'string.pattern.base': 'O campo {#label} precisa ser um e-mail válido',
    'string.base': 'O campo {#label} precisa ser uma cadeia de caracteres',
    'string.min': 'O campo {#label} precisa possuir no mínimo {#limit} caracteres',
  },
);

export const createAccountValidationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { nome, email, senha } = req.body;
  const cliente: IPostCliente = {
    nome: nome && sanitizeNome(nome),
    email: email && trimEmail(email),
    senha,
  };

  const { error } = createAccountSchema.validate(cliente);

  if (error) throw new HttpError(StatusCodes.BAD_REQUEST, error.message);

  next();
};

const clientePatchSchema: ObjectSchema = Joi.object(
  {
    nome: nomeSchema,
    email: emailSchema,
    senha: senhaSchema,
  },
).messages(
  {
    'string.pattern.base': 'O campo {#label} precisa ser um e-mail válido',
    'string.base': 'O campo {#label} precisa ser uma cadeia de caracteres',
    'string.min': 'O campo {#label} precisa possuir no mínimo {#limit} caracteres',
  },
);

export const clientePatchValidationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { nome, email, senha } = req.body;
  const cliente: IPatchCliente = {
    nome: nome && sanitizeNome(nome),
    email: email && trimEmail(email),
    senha,
  };

  if (!nome && !email && !senha) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      'Um dos campos a seguir precisam estar presentes: "nome", "email ou "senha"',
    );
  }

  const { error } = clientePatchSchema.validate(cliente);

  if (error) throw new HttpError(StatusCodes.BAD_REQUEST, error.message);

  req.body = cliente;

  next();
};
