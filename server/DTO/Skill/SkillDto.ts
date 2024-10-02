import { z } from 'zod';

export const SkillSchema = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
  user: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type SkillDto = z.infer<typeof SkillSchema>;
