import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
  isAdmin: z.boolean(),
});

export type UserDto = z.infer<typeof UserSchema>;
