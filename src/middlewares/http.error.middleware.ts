import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../utils/HttpError';

const httpErrorMiddleware = (err: Error, req: Request, res: Response) => {
  const { status, message } = err as HttpException;
  res.status(status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
};

export default httpErrorMiddleware;
