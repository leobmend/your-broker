import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import clientesService from '../services/clientes.service';

const getByCod = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const cliente = await clientesService.getByCod(parseInt(codCliente, 10));

  return res.status(StatusCodes.OK).json({ data: cliente });
};

const clientesController = {
  getByCod,
};

export default clientesController;
