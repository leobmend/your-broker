import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import clientesService from '../services/clientes.service';

const createAccount = async (req: Request, res: Response): Promise<Response> => {
  const jwtToken = await clientesService.create(req.body);

  return res.status(StatusCodes.CREATED).json({ token: jwtToken });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const jwtToken = await clientesService.authenticate(req.body);

  return res.status(StatusCodes.OK).json({ token: jwtToken });
};

const credentialsController = {
  createAccount,
  login,
};

export default credentialsController;
