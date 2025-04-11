import Knex from 'knex';
import config from '../../../knexfile';
import 'dotenv/config';

const { NODE_ENV } = process.env;
const DatabaseConnection = Knex(config[String(NODE_ENV) as 'development' | 'production']);

export async function testConnection() {
  try {
    await DatabaseConnection.raw(`SELECT 1`);
    console.log('PORTFOLIO DATABASE', 'Connected');
  } catch (e) {
    console.error(`PORTFOLIO DATABASE ERROR: ${(e as Error).message}`);
    process.kill(process.ppid, 'SIGTERM');
  }
}

export default DatabaseConnection;
