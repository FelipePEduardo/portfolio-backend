import { z } from 'zod';

export const SkillSearchSchema = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
});

export type SkillSearchDto = z.infer<typeof SkillSearchSchema>;
