import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { ISkillController } from '@interfaces/controllers';
import { ISkillService } from '@interfaces/services';
import { getRequestInfo, validateNumericProp } from '@application/helpers';
import { SkillCreateSchema, SkillUpdateSchema } from '@DTO/Skill';

@injectable()
export default class SkillController implements ISkillController {
  constructor(private service: ISkillService) {}

  async getById(req: Request, res: Response) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id);

    const skill = await this.service.getById(id);

    return res.json(skill);
  }

  async search(req: Request, res: Response) {
    const { query } = getRequestInfo(req);

    const response = await this.service.search(query);

    return res.json(response);
  }

  async create(req: Request, res: Response) {
    const { body } = getRequestInfo(req, SkillCreateSchema);

    const skill = await this.service.create(body);

    return res.status(201).json(skill.toDto());
  }

  async update(req: Request, res: Response) {
    const { body, params } = getRequestInfo(req, SkillUpdateSchema);

    const id = validateNumericProp(params.id);

    const skill = await this.service.update(id, body);

    return res.status(201).json(skill.toDto());
  }

  async delete(req: Request, res: Response) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id);

    await this.service.delete(id);

    return res.sendStatus(204);
  }
}
