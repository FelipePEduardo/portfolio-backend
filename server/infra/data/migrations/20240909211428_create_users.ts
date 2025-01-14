import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('users').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name', 100).notNullable();
        table.string('email', 255).notNullable().unique();
        table.string('password').notNullable();
        table.boolean('is_admin').defaultTo(false);
        table.datetime('created_at').notNullable();
        table.datetime('updated_at').defaultTo(null);
        table.boolean('active').notNullable().defaultTo(true);
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
