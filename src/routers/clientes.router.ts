import { Router } from 'express';

import clientesController from '../controllers/clientes.controller';
import investimentosController from '../controllers/investimentos.controller';
import operacoesController from '../controllers/operacoes.controller';
import transacoesController from '../controllers/transacoes.controller';

import authenticationMiddleware from '../middlewares/authentication.middleware';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import operacaoValidationMiddleware from '../middlewares/operacoes.validations.middleware';
import transacaoValidationMiddleware from '../middlewares/transacoes.validations.middleware';

const clientesRouter = Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Cliente:
 *        type: object
 *        properties:
 *          codCliente:
 *            type: integer
 *          nome:
 *            type: string
 *          email:
 *            type: string
 *          saldo:
 *            type: decimal
 *        example:
 *          codCliente: 1
 *          nome: John Doe
 *          email: john@test.com
 *          saldo: 100.50
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      Investimento:
 *        type: object
 *        properties:
 *          codCliente:
 *            type: integer
 *          codAtivo:
 *            type: string
 *          qtdeAtivo:
 *            type: integer
 *          valor:
 *            type: decimal
 *        example:
 *          codCliente: 1
 *          codAtivo: ITUB4
 *          qtdeAtivo: 1000
 *          valor: 15.5
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      Operação:
 *        type: object
 *        properties:
 *          codOperacao:
 *            type: integer
 *          data:
 *            type: timestamp
 *          codCliente:
 *            type: integer
 *          codAtivo:
 *            type: string
 *          qtdeAtivo:
 *            type: integer
 *          tipo:
 *            type: compra|venda
 *          valor:
 *            type: decimal
 *        example:
 *          codOperacao: 1
 *          data: 2022-07-21T18:12:29.000Z
 *          codCliente: 1
 *          codAtivo: ITUB4
 *          qtdeAtivo: 1000
 *          tipo: compra
 *          valor: 15.5
 *
 *      Nova Operação:
 *        type: object
 *        required:
 *          - codAtivo
 *          - qtdeAtivo
 *          - tipo
 *        properties:
 *          codAtivo:
 *            type: string
 *          qtdeAtivo:
 *            type: integer
 *          tipo:
 *            type: compra|venda
 *        example:
 *          codAtivo: ITUB4
 *          qtdeAtivo: 1000
 *          tipo: compra
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      Transação:
 *        type: object
 *        properties:
 *          codTransação:
 *            type: integer
 *          data:
 *            type: timestamp
 *          codCliente:
 *            type: integer
 *          tipo:
 *            type: deposito|saque
 *          valor:
 *            type: decimal
 *        example:
 *          codTransacao: 1
 *          data: 2022-07-21T18:12:29.000Z
 *          codCliente: 1
 *          tipo: deposito
 *          valor: 1500
 *
 *      Nova Transação:
 *        type: object
 *        required:
 *          - tipo
 *          - valor
 *        properties:
 *          tipo:
 *            type: deposito|saque
 *          valor:
 *            type: decimal
 *        example:
 *          tipo: deposito
 *          valor: 1500
*/

/**
 * @swagger
 *  /clientes/{codCliente}:
 *    get:
 *      tags: [Clientes]
 *      description: Retorna o cliente pelo seu código
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: codCliente
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Cliente'
*/

clientesRouter.get(
  '/:codCliente',
  authenticationMiddleware,
  authorizationMiddleware,
  clientesController.getByCod,
);

/**
 * @swagger
 *  /clientes/{codCliente}/investimentos:
 *    get:
 *      tags: [Investimentos]
 *      description: Retorna os investimentos do cliente
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: codCliente
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Investimento'
*/

clientesRouter.get(
  '/:codCliente/investimentos',
  authenticationMiddleware,
  authorizationMiddleware,
  investimentosController.getByCliente,
);

/**
 * @swagger
 *  /clientes/{codCliente}/transacoes:
 *    get:
 *      tags: [Transações]
 *      description: Retorna as transações do cliente
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: codCliente
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Transações'
*/

clientesRouter.get(
  '/:codCliente/transacoes',
  authenticationMiddleware,
  authorizationMiddleware,
  transacoesController.getByCliente,
);

/**
 * @swagger
 *  /clientes/{codCliente}/operacoes:
 *    get:
 *      tags: [Operações]
 *      description: Retorna as operações do cliente
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: codCliente
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Operação'
*/

clientesRouter.get(
  '/:codCliente/operacoes',
  authenticationMiddleware,
  authorizationMiddleware,
  operacoesController.getByCliente,
);

/**
 * @swagger
 *  /clientes/{codCliente}/transacoes:
 *    post:
 *      tags: [Transações]
 *      description: Cadastra uma operação do cliente
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: codCliente
 *          type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Nova Transação'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Transação'
*/

clientesRouter.post(
  '/:codCliente/transacoes/',
  authenticationMiddleware,
  authorizationMiddleware,
  transacaoValidationMiddleware,
  transacoesController.create,
);

/**
 * @swagger
 *  /clientes/{codCliente}/operacoes:
 *    post:
 *      tags: [Operações]
 *      description: Cadastra uma transação do cliente
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: codCliente
 *          type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Nova Operação'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Transação'
*/

clientesRouter.post(
  '/:codCliente/operacoes/',
  authenticationMiddleware,
  authorizationMiddleware,
  operacaoValidationMiddleware,
  operacoesController.create,
);

export default clientesRouter;
