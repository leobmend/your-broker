import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerConfig from './docs/swagger.config';

import httpErrorMiddleware from './middlewares/http.error.middleware';
import router from './routers';

const app = express();

const swaggerDoc = swaggerJSDoc(swaggerConfig);

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(router);
app.use(httpErrorMiddleware);

export default app;
