import { z } from 'zod';

export const SkillUpdateSchema = z.object({
  name: z.string().optional(),
});

export type SkillUpdateDto = z.infer<typeof SkillUpdateSchema>;
