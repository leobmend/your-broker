import { Router } from 'express';

import ativosController from '../controllers/ativos.controller';

const ativosRouter = Router();

/**
 * @swagger
 *  tags:
 *    name: Ativos
 *    description: Endpoints de ativos
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
*/

/**
 * @swagger
 *  /ativos:
 *    get:
 *      tags: [Ativos]
 *      description: Retorna a lista de ativos
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

ativosRouter.get(
  '/:codAtivo',
  ativosController.getByCod,
);

export default ativosRouter;
