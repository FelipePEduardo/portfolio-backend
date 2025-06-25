import { SearchResponse, SkillCreateDto, SkillDto, SkillSearchDto, SkillUpdateDto, ContextParams } from '@DTO';
import { Skill } from '@models/Skill';

export default abstract class ISkillService {
  abstract getById(id: number): Promise<Skill>;
  abstract search(queryOptions: Record<string, unknown>): Promise<SearchResponse<SkillSearchDto>>;
  abstract create(dto: SkillCreateDto, contextParams: ContextParams): Promise<SkillDto>;
  abstract update(id: number, dto: SkillUpdateDto): Promise<SkillDto>;
  abstract delete(id: number): Promise<void>;
}
