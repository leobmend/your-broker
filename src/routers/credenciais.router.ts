import { Router } from 'express';
import credenciaisController from '../controllers/credenciais.controller';

const credenciaisRouter = Router();

credenciaisRouter.post(
  '/cadastrar',
  credenciaisController.createAccount,
);

credenciaisRouter.post(
  '/entrar',
  credenciaisController.login,
);

export default credenciaisRouter;
