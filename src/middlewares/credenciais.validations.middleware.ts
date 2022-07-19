import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi, { ObjectSchema } from 'joi';

import { IPostCliente, IPostLogin } from '../interfaces/clientes.interface';

import HttpError from '../utils/HttpError';

const loginSchema: ObjectSchema = Joi.object(
  {
    email: Joi.string().regex(/\w+([.]\w+)*@\w+([.]\w+)+/i).required(),
    senha: Joi.string().min(6).required(),
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
    nome: Joi.string().min(3).required(),
    email: Joi.string().regex(/\w+([.]\w+)*@\w+([.]\w+)+/i).required(),
    senha: Joi.string().min(6).required(),
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
  const cliente: IPostCliente = req.body;
  const { error } = createAccountSchema.validate(cliente);

  if (error) throw new HttpError(StatusCodes.BAD_REQUEST, error.message);

  next();
};
