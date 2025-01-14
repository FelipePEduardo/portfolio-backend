import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_role').del();

  await knex('user_role').insert([
    { id: 1, name: 'USER' },
    { id: 2, name: 'ADMIN' },
    { id: 3, name: 'MASTER' },
  ]);
}
