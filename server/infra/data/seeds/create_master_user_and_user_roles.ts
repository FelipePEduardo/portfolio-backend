import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();
  await knex('user_role').del();

  await knex('user_role').insert([
    { id: 1, name: 'USER' },
    { id: 2, name: 'ADMIN' },
    { id: 3, name: 'MASTER' },
  ]);

  const { DEFAULT_USER_NAME, DEFAULT_USER_EMAIL, DEFAULT_USER_PASSWORD } = process.env;

  const hashedPassword = await bcrypt.hash(String(DEFAULT_USER_PASSWORD), 10);

  await knex('users').insert([
    {
      id: 1,
      name: DEFAULT_USER_NAME,
      email: DEFAULT_USER_EMAIL,
      password: hashedPassword,
      created_at: new Date(),
      active: true,
      user_role_id: 3,
    },
  ]);
}
