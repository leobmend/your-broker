import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi, { ObjectSchema } from 'joi';

import { IOperacao } from '../interfaces/operacoes.interface';

import HttpError from '../utils/HttpError';

const operacaoSchema: ObjectSchema = Joi.object(
  {
    codCliente: Joi.number().integer().positive().required(),
    codAtivo: Joi.string().min(2).required(),
    qtdeAtivo: Joi.number().integer().positive().required(),
  },
).messages(
  {
    'any.required': 'O campo {#label} é obrigatório',
    'string.base': 'O campo {#label} precisa ser uma cadeia de caracteres',
    'string.min': 'O campo {#label} precisa ter no mínimo {#limit} caracteres',
    'number.base': 'O campo {#label} precisa ser um número',
    'number.integer': 'O campo {#label} precisa ser um inteiro',
    'number.positive': 'O campo {#label} precisa ser um número positivo',
  },
);

const operacaoValidationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const operacao: IOperacao = req.body;
  const { error } = operacaoSchema.validate(operacao);

  if (error) throw new HttpError(StatusCodes.BAD_REQUEST, error.message);

  next();
};

export default operacaoValidationMiddleware;
