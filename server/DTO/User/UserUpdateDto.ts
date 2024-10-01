import { z } from 'zod';

export const UserUpdateChema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  oldPassword: z.string().min(6, 'Password must have at least 6 characters').optional(),
  newPassword: z.string().min(6, 'Password must have at least 6 characters').optional(),
});

export type UserUpdateDto = z.infer<typeof UserUpdateChema>;
