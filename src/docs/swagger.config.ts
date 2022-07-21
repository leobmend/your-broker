import { Options } from 'swagger-jsdoc';

const swaggerConfig: Options = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Your Broker API',
      description: 'API RESTful que simula o funcionamento de uma corretora de investimentos',
      version: '1.0',
    },
    servers: [
      { url: 'http://your-broker.herokuapp.com', description: 'Production Heroku' },
    ],
  },
  apis: [
    './src/routers/ativos.router.ts',
    './src/routers/clientes.router.ts',
    './src/routers/credenciais.router.ts',
  ],
};

export default swaggerConfig;
