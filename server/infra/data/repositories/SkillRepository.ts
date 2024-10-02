import { injectable } from 'inversify';
import { getCountFromResponse } from './helpers';

import { ISkillRepository } from '@interfaces/repositories';
import { SkillQueryResponse, SkillSearchQueryResponse } from '../query-responses';

import BaseRepository from './BaseRepository';
import SkillMapper from '@infra/mappers/SkillMapper';
import { Skill } from '@models/Skill';

@injectable()
export default class SkillRepository extends BaseRepository implements ISkillRepository {
  async getById(id: number) {
    const skill = await this.connection('skills')
      .select<SkillQueryResponse>(
        'skills.id',
        'skills.name',
        'skills.active',
        'skills.created_at as createdAt',
        'skills.updated_at as updatedAt',
        'skills.user_id as userId',
        'users.name as userName',
      )
      .innerJoin('users', 'skills.user_id', 'users.id')
      .where('skills.id', id)
      .first();

    if (!skill) return undefined;

    return SkillMapper.mapOne(skill);
  }

  async getByName(name: string) {
    const skill = await this.connection('skills').select(1).where('name', name).first();

    if (!skill) return undefined;

    return SkillMapper.mapOne(skill);
  }

  async search() {
    const query = await this.connection('skills').select<SkillSearchQueryResponse[]>(
      'id',
      'name',
      'active',
      this.connection.raw('COUNT(*) OVER() as count'),
    );

    return { count: getCountFromResponse(query), data: SkillMapper.mapSearch(query) };
  }

  async create(entity: Skill) {
    const skillToCreate = this.mountSkillToCreate(entity);

    const [createdId] = await this.connection('skills').insert(skillToCreate);

    const skillCreated = await this.getById(createdId);

    if (!skillCreated) throw new Error('Error while creating skill');

    return skillCreated;
  }

  async update(entity: Skill) {
    await this.connection('skills')
      .update({ name: entity.getName(), updated_at: entity.getUpdatedAt() })
      .where('id', entity.id)
      .where('user_id', entity.user.id);

    const skillUpdated = await this.getById(entity.id);

    if (!skillUpdated) throw new Error('Error while updating skill');

    return skillUpdated;
  }

  async inactivate(entity: Skill) {
    await this.connection('skills').update({ active: false }).where('id', entity.id).where('user_id', entity.user.id);
  }

  async reactivate(entity: Skill) {
    await this.connection('skills').update({ active: true }).where('id', entity.id).where('user_id', entity.user.id);
  }

  /* #region Private */

  private mountSkillToCreate(entity: Skill) {
    return {
      id: entity.id,
      name: entity.getName(),
      created_at: entity.createdAt,
      updated_at: null,
      active: entity.active,
      user_id: entity.user.id,
    };
  }

  /* #endregion */
}
