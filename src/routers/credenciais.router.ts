import { Router } from 'express';

import credenciaisController from '../controllers/credenciais.controller';

import {
  loginValidationMiddleware, createAccountValidationMiddleware,
} from '../middlewares/credenciais.validations.middleware';

const credenciaisRouter = Router();

credenciaisRouter.post(
  '/cadastrar',
  createAccountValidationMiddleware,
  credenciaisController.createAccount,
);

credenciaisRouter.post(
  '/entrar',
  loginValidationMiddleware,
  credenciaisController.login,
);

export default credenciaisRouter;
