import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('user_role').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('user_role', (table) => {
        table.increments('id').primary();
        table.enum('name', ['USER', 'ADMIN', 'MASTER']);
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_role');
}
