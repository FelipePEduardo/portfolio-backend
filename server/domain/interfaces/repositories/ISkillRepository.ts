import { SearchResponse, SkillSearchDto } from '@DTO';
import { Skill } from '@models/Skill';

export default abstract class ISkillRepository {
  abstract getById(id: number): Promise<Skill | undefined>;
  abstract getByName(name: string): Promise<Skill | undefined>;
  abstract search(queryOptions: Record<string, unknown>): Promise<SearchResponse<SkillSearchDto>>;
  abstract create(skill: Skill): Promise<Skill>;
  abstract update(skill: Skill): Promise<Skill>;
  abstract delete(skill: Skill): Promise<void>;
}
