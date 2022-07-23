import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import clientesService from '../services/clientes.service';

const getByCod = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;
  const cliente = await clientesService.getByCod(parseInt(codCliente, 10));

  return res.status(StatusCodes.OK).json({ data: cliente });
};

const editProfile = async (req: Request, res: Response): Promise<Response> => {
  const { codCliente } = req.params;

  const editedCliente = await clientesService.editProfile(parseInt(codCliente, 10), req.body);

  return res.status(StatusCodes.OK).json({ data: editedCliente });
};

const clientesController = {
  getByCod,
  editProfile,
};

export default clientesController;
