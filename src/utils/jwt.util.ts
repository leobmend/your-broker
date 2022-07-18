import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

import HttpError from './HttpError';

const secret = process.env.JWT_SECRET as string;

const jwtConfig: SignOptions = {
  expiresIn: '3h',
  algorithm: 'HS256',
};

const generateToken = (codCliente: number): string => (
  jwt.sign({ data: { codCliente } }, secret, jwtConfig)
);

const decodeToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (err) {
    throw new HttpError(401, 'Expired or invalid token');
  }
};

const jwtUtils = {
  generateToken,
  decodeToken,
};

export default jwtUtils;
