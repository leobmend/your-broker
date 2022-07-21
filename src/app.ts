import express from 'express';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import swaggerConfig from './docs/swagger.config';

import httpErrorMiddleware from './middlewares/http.error.middleware';
import router from './routers';

const swaggerDoc = swaggerJSDoc(swaggerConfig);

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(router);
app.use(httpErrorMiddleware);

export default app;
