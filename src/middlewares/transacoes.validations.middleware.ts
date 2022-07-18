import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi, { ObjectSchema } from 'joi';

import { ITransacao } from '../interfaces/transacoes.interface';

import HttpError from '../utils/HttpError';

const transacaoSchema: ObjectSchema = Joi.object(
  {
    codCliente: Joi.number().integer().positive().required(),
    valor: Joi.number().positive().required(),
  },
).messages(
  {
    'any.required': 'O campo {#label} é obrigatório',
    'number.base': 'O campo {#label} precisa ser um número',
    'number.integer': 'O campo {#label} precisa ser um inteiro',
    'number.positive': 'O campo {#label} precisa ser um número positivo',
  },
);

const transacaoValidationMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const transacao: ITransacao = req.body;
  const { error } = transacaoSchema.validate(transacao);

  if (error) throw new HttpError(StatusCodes.BAD_REQUEST, error.message);

  next();
};

export default transacaoValidationMiddleware;
