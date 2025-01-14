import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.integer('user_role_id').unsigned().references('id').inTable('user_role').notNullable();
    table.dropColumn('is_admin');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.dropForeign('user_role_id');
  });
}
