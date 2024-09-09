import Knex from 'knex';
import config from '../../../knexfile';

const DatabaseConnection = Knex(config);

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
