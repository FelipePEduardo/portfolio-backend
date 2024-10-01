import { z } from 'zod';

export const UserCreateSchema = z.object({
  name: z.string(),
  email: z.string().email('Email not valid'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
});

export type UserCreateDto = z.infer<typeof UserCreateSchema>;
