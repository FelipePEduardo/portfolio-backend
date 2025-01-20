import { z } from 'zod';
import { UserRoleSchema } from './User';

export const ContextParamsSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
  userRole: UserRoleSchema,
});

export type ContextParams = z.infer<typeof ContextParamsSchema>;
