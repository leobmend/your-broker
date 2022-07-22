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
      { url: 'https://your-broker.herokuapp.com/', description: 'Production Heroku' },
      // { url: 'http://localhost:3001/', description: 'Development' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/routers/ativos.router.ts',
    './src/routers/clientes.router.ts',
    './src/routers/credenciais.router.ts',
  ],
};

export default swaggerConfig;
