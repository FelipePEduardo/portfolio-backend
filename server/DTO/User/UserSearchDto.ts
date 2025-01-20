import { z } from 'zod';

export const UserSearchSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
  userRole: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type UserSearchDto = z.infer<typeof UserSearchSchema>;
