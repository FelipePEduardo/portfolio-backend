import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must have at least 6 characters'),
});

export type SignInDto = z.infer<typeof SignInSchema>;
