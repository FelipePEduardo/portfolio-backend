import { injectable } from 'inversify';

import { ISkillService } from '@interfaces/services';
import { ISkillRepository, IUserRepository } from '@interfaces/repositories';
import { SkillCreateDto, SkillUpdateDto } from '@DTO';
import { Skill } from '@models/Skill';
import { ContextParams } from '@DTO/ContexParams';
import { EntityNotFound } from 'server/errors';

@injectable()
export default class SkillService implements ISkillService {
  constructor(
    private readonly repository: ISkillRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async getById(id: number) {
    const skill = await this.repository.getById(id);

    if (!skill) throw new EntityNotFound('Skil', id);

    return skill;
  }

  async search(queryOptions: Record<string, unknown>) {
    return this.repository.search(queryOptions);
  }

  async create(dto: SkillCreateDto, contextParams: ContextParams) {
    await this.validateIfSkillAlreadyExists(dto.name);

    const user = await this.getUserById(contextParams.id);

    const skillToCreate = new Skill({ ...dto, user });

    const created = await this.repository.create(skillToCreate);

    return created.toDto();
  }

  async update(id: number, dto: SkillUpdateDto) {
    await this.validateIfSkillAlreadyExists(dto.name);

    const skill = await this.getById(id);

    skill.update(dto);

    const updated = await this.repository.update(skill);

    return updated.toDto();
  }

  async delete(id: number) {
    const skill = await this.getById(id);

    await this.repository.delete(skill);
  }

  /* #region Private */

  private async validateIfSkillAlreadyExists(name?: string) {
    if (!name) return;

    const skillAlreadyExists = await this.repository.getByName(name);

    if (skillAlreadyExists) throw new Error('Skill already exists');
  }

  private async getUserById(userId: number) {
    const user = await this.userRepository.getPartialById(userId);

    if (!user) throw new Error('User not found');

    return user;
  }

  /* #endregion  */
}
