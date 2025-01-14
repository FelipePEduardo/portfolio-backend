import { injectable } from 'inversify';

import { ISkillService } from '@interfaces/services';
import { ISkillRepository, IUserRepository } from '@interfaces/repositories';
import { SkillCreateDto, SkillUpdateDto } from '@DTO';
import { Skill } from '@models/Skill';

@injectable()
export default class SkillService implements ISkillService {
  constructor(
    private repository: ISkillRepository,
    private userRepository: IUserRepository,
  ) {}

  async getById(id: number) {
    const skill = await this.repository.getById(id);

    if (!skill) throw new Error('Entity not found');

    return skill;
  }

  async search(queryOptions: Record<string, unknown>) {
    return this.repository.search(queryOptions);
  }

  async create(dto: SkillCreateDto) {
    await this.validateIfSkillAlreadyExists(dto.name);

    const user = await this.getUser();

    const skillToCreate = new Skill({ ...dto, user });

    return this.repository.create(skillToCreate);
  }

  async update(id: number, dto: SkillUpdateDto) {
    await this.validateIfSkillAlreadyExists(dto.name);

    const skill = await this.getById(id);

    skill.update(dto);

    return this.repository.update(skill);
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

  private async getUser() {
    const user = await this.userRepository.getPartialById(1);

    if (!user) throw new Error('User not found');

    return user;
  }

  /* #endregion  */
}
