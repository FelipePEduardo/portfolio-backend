import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable('skills').then((exists) => {
    if (!exists) {
      return knex.schema.createTable('skills', (table) => {
        table.increments('id').primary();
        table.string('name', 100);
        table.integer('user_id').unsigned().references('id').inTable('users').notNullable();
        table.datetime('created_at').notNullable();
        table.datetime('updated_at').defaultTo(null);
        table.boolean('active').notNullable().defaultTo(true);
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('skills');
}
