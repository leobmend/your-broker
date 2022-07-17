import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import clientesService from '../services/clientes.service';

const getClientes = async (_req: Request, res: Response): Promise<Response> => {
  const clientes = await clientesService.getAll();

  return res.status(StatusCodes.OK).json(clientes);
};

const clientesController = {
  getClientes,
};

export default clientesController;
