import { z } from 'zod';

export const UserSearchSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  active: z.boolean(),
});

export type UserSearchDto = z.infer<typeof UserSearchSchema>;
