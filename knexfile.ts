import type { Knex } from 'knex';
import 'dotenv/config';

const {
  DATABASE_NAME,
  DATABASE_URL,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env;

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    database: DATABASE_NAME,
    host: DATABASE_URL,
    port: Number(DATABASE_PORT),
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: './server/infra/data/migrations',
  },
};

export default config;
