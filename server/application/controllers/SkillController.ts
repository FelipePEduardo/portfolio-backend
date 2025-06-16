import { Request } from 'express';
import { injectable } from 'inversify';

import { ISkillController } from '@interfaces/controllers';
import { ISkillService } from '@interfaces/services';
import { getRequestInfo, validateNumericProp } from '@application/helpers';
import { SkillCreateSchema, SkillUpdateSchema } from '@DTO/Skill';
import { validateContextParams } from '@application/helpers/validateContextParams';

@injectable()
export default class SkillController implements ISkillController {
  constructor(private service: ISkillService) {}

  async getById(req: Request) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id);

    const entity = await this.service.getById(id);

    return entity.toDto();
  }

  async search(req: Request) {
    const { query } = getRequestInfo(req);

    return this.service.search(query);
  }

  async create(req: Request) {
    const { body, contextParams } = getRequestInfo(req, SkillCreateSchema);

    const validatedContextParams = validateContextParams(contextParams);

    return this.service.create(body, validatedContextParams);
  }

  async update(req: Request) {
    const { body, params } = getRequestInfo(req, SkillUpdateSchema);

    const id = validateNumericProp(params.id);

    return this.service.update(id, body);
  }

  async delete(req: Request) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id);

    await this.service.delete(id);
  }
}
