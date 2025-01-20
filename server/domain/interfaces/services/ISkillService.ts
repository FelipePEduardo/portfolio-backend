import { SearchReponse, SkillCreateDto, SkillSearchDto, SkillUpdateDto } from '@DTO';
import { ContextParams } from '@DTO/ContexParams';
import { Skill } from '@models/Skill';

export default abstract class ISkillService {
  abstract getById(id: number): Promise<Skill>;
  abstract search(queryOptions: Record<string, unknown>): Promise<SearchReponse<SkillSearchDto>>;
  abstract create(dto: SkillCreateDto, contextParams: ContextParams): Promise<Skill>;
  abstract update(id: number, dto: SkillUpdateDto): Promise<Skill>;
  abstract delete(id: number): Promise<void>;
}
