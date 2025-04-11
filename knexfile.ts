import type { Knex } from 'knex';
import 'dotenv/config';
import path from 'node:path';

const { DATABASE_NAME, DATABASE_URL, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;

const config: Record<'development' | 'production', Knex.Config> = {
  development: {
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
    seeds: {
      directory: './server/infra/data/seeds',
    },
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'server', 'infra', 'data', 'database.db'),
    },
    pool: {
      afterCreate: (conn: any, cb: () => unknown) => {
        conn.run('PRAGMA foreign_keys = ON', cb);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'server', 'infra', 'data', 'migrations'),
    },
  },
};

export default config;
