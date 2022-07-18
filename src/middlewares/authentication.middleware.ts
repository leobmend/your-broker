import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IAuthRequest } from '../interfaces/authentication.interface';

import HttpError from '../utils/HttpError';
import jwt from '../utils/jwt.util';

const authenticationMiddleware = (req: IAuthRequest, _res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token não encontrado');

  let decoded;
  try {
    decoded = jwt.decodeToken(token);
  } catch (err) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, 'Token inválido ou expirado');
  }

  req.codCliente = decoded.data.codCliente;

  next();
};

export default authenticationMiddleware;
