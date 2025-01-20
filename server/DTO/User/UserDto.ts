import { z } from 'zod';

import { UserRoleSchema } from './UserRoleDto';

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
  userRole: UserRoleSchema,
});

export type UserDto = z.infer<typeof UserSchema>;
