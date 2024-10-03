import { z } from 'zod';

export const SkillCreateSchema = z.object({
  name: z.string(),
});

export type SkillCreateDto = z.infer<typeof SkillCreateSchema>;
