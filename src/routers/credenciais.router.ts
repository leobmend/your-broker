import { Router } from 'express';

import credenciaisController from '../controllers/credenciais.controller';

import {
  loginValidationMiddleware, createAccountValidationMiddleware,
} from '../middlewares/credenciais.validations.middleware';

const credenciaisRouter = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Novo Cliente:
 *        type: object
 *        required:
 *          - nome
 *          - email
 *          - senha
 *        properties:
 *          nome:
 *            type: string
 *          email:
 *            type: string
 *          senha:
 *            type: string
 *        example:
 *          nome: John Doe
 *          email: john@test.com
 *          senha: "123123"
 *
 *      Login:
 *        type: object
 *        required:
 *          - email
 *          - senha
 *        properties:
 *          email:
 *            type: string
 *          senha:
 *            type: string
 *        example:
 *          email: john@test.com
 *          senha: "123123"
 *
 *      Token:
 *        type: string
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9[...]
*/

/**
 * @swagger
 *  /credenciais/cadastrar:
 *    post:
 *      tags: [Credenciais]
 *      description: Cadastra o cliente
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Novo Cliente'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Token'
*/

credenciaisRouter.post(
  '/cadastrar',
  createAccountValidationMiddleware,
  credenciaisController.createAccount,
);

/**
 * @swagger
 *  /credenciais/entrar:
 *    post:
 *      tags: [Credenciais]
 *      description: Loga o cliente
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Token'
*/

credenciaisRouter.post(
  '/entrar',
  loginValidationMiddleware,
  credenciaisController.login,
);

export default credenciaisRouter;
