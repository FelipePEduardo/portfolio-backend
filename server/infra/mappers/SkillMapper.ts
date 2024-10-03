import { SkillSearchDto } from '@DTO/Skill';
import { SkillQueryResponse, SkillSearchQueryResponse } from '@infra/data/query-responses';
import { Skill } from '@models/Skill';
import { UserPartial } from '@models/User';

export default abstract class SkillMapper {
  static mapOne(query: SkillQueryResponse): Skill {
    return new Skill({
      id: query.id,
      name: query.name,
      active: query.active === 1,
      createdAt: query.createdAt,
      updateAt: query.updatedAt,
      user: new UserPartial({
        id: query.userId,
        name: query.userName,
      }),
    });
  }

  static mapSearch(query: SkillSearchQueryResponse[]): SkillSearchDto[] {
    return query.map((row) => ({
      id: row.id,
      name: row.name,
      active: row.active === 1,
    }));
  }
}
