import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IAuthRequest } from '../interfaces/authentication.interface';
import HttpError from '../utils/HttpError';

const authorizationMiddleware = (
  req: IAuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const { codCliente: codClienteToken } = req;
  const codClienteParams = parseInt(req.params.codCliente, 10);

  if (codClienteToken !== codClienteParams) {
    throw new HttpError(StatusCodes.UNAUTHORIZED, 'Cliente não autorizado');
  }

  next();
};

export default authorizationMiddleware;
