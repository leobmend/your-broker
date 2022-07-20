import 'dotenv/config';
import { Dialect, Options } from 'sequelize';

const config: Options = {
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  dialect: process.env.DATABASE_DIALECT as Dialect || 'mysql',
};

export = config;
