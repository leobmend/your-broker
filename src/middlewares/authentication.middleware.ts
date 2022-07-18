import { NextFunction, Response } from 'express';

import { IAuthRequest } from '../interfaces/authentication.interface';

import HttpError from '../utils/HttpError';
import jwt from '../utils/jwt.util';

const authenticationMiddleware = (req: IAuthRequest, _res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) throw new HttpError(401, 'Token not found');

  const decoded = jwt.decodeToken(token);

  req.codCliente = decoded.data.codCliente;

  next();
};

export default authenticationMiddleware;
