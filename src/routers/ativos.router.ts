import { Router } from 'express';

import ativosController from '../controllers/ativos.controller';

const ativosRouter = Router();

/**
 * @swagger
 *  tags:
 *    - name: Credenciais
 *      description: Endpoints de credenciais
 *    - name: Ativos
 *      description: Endpoints de ativos disponíveis
 *    - name: Clientes
 *      description: Endpoints de clientes cadastrados
 *    - name: Investimentos
 *      description: Endpoints de investimentos atuais
 *    - name: Operações
 *      description: Endpoints de operações (compra ou venda de ativos)
 *    - name: Transações
 *      description: Endpoints de transações (depósito ou saque de valores financeiros)
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *      Ativo:
 *        type: object
 *        properties:
 *          codCliente:
 *            type: string
 *          empresa:
 *            type: string
 *          qtdeAtivo:
 *            type: integer
 *          valor:
 *            type: decimal
 *        example:
 *          codAtivo: ITUB4
 *          empresa: ITAUUNIBANCO
 *          qtdeAtivo: 456789
 *          valor: 15.5
*/

/**
 * @swagger
 *  /ativos:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna 10 items da lista de ativos
 *      parameters:
 *        - in: query
 *          name: termo
 *          type: string
 *          description: O termo pesquisado nos códigos e nos nomes das empresas dos ativos
 *        - in: query
 *          name: pag
 *          type: integer
 *          description: Número da página a ser visualizada
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Ativo'
*/

ativosRouter.get(
  '/',
  ativosController.getBySearch,
);

/**
 * @swagger
 *  /ativos/{codAtivo}:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna o ativo pelo seu código
 *      parameters:
 *        - in: path
 *          name: codAtivo
 *          type: string
 *          required: true
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Ativo'
*/

ativosRouter.get(
  '/:codAtivo',
  ativosController.getByCod,
);

export default ativosRouter;
