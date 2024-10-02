import { SearchReponse, SkillCreateDto, SkillSearchDto, SkillUpdateDto } from '@DTO';
import { Skill } from '@models/Skill';

export default abstract class ISkillService {
  abstract getById(id: number): Promise<Skill>;
  abstract search(queryOptions: Record<string, unknown>): Promise<SearchReponse<SkillSearchDto>>;
  abstract create(dto: SkillCreateDto): Promise<Skill>;
  abstract update(id: number, dto: SkillUpdateDto): Promise<Skill>;
  abstract inactivate(id: number): Promise<void>;
  abstract reactivate(id: number): Promise<void>;
}
