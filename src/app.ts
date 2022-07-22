import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';

import swaggerDocs from './docs/swagger.json';

import httpErrorMiddleware from './middlewares/http.error.middleware';
import router from './routers';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(router);
app.use(httpErrorMiddleware);

export default app;
