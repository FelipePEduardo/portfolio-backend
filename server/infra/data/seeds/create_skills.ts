import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('skills').del();

  await knex('skills').insert([
    { id: 1, name: 'JavaScript', user_id: 1, created_at: new Date(), active: 1 },
    { id: 2, name: 'TypeScript', user_id: 1, created_at: new Date(), active: 1 },
    { id: 3, name: 'Node.js', user_id: 1, created_at: new Date(), active: 1 },
    { id: 4, name: 'Express', user_id: 1, created_at: new Date(), active: 1 },
    { id: 6, name: 'Vue.js', user_id: 1, created_at: new Date(), active: 1 },
    { id: 6, name: 'SQL', user_id: 1, created_at: new Date(), active: 1 },
    { id: 7, name: 'MySQL', user_id: 1, created_at: new Date(), active: 1 },
    { id: 8, name: 'MongoDB', user_id: 1, created_at: new Date(), active: 1 },
    { id: 9, name: 'Git', user_id: 1, created_at: new Date(), active: 1 },
    { id: 10, name: 'Github', user_id: 1, created_at: new Date(), active: 1 },
    { id: 11, name: 'Postman', user_id: 1, created_at: new Date(), active: 1 },
    { id: 12, name: 'Testes Unitários', user_id: 1, created_at: new Date(), active: 1 },
  ]);
}
