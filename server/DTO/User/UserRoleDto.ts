import { z } from 'zod';

export const UserRoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type UserRoleDto = z.infer<typeof UserRoleSchema>;
