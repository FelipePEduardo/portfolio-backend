import { Request } from 'express';
import { injectable } from 'inversify';
import { IUserController } from '@interfaces/controllers';
import { IUserService } from '@interfaces/services';
import { getRequestInfo, validateNumericProp } from '@application/helpers';
import { UserCreateSchema, UserUpdateChema } from '@DTO/User';

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async getById(req: Request) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id, 'id');

    const user = await this.service.getById(id);

    return user.toJSON();
  }

  async search(req: Request) {
    const { query } = getRequestInfo(req);

    return this.service.search(query);
  }

  async create(req: Request) {
    const { body } = getRequestInfo(req, UserCreateSchema);

    const userCreated = await this.service.create(body);

    return userCreated.toJSON();
  }

  async update(req: Request) {
    const { body, params } = getRequestInfo(req, UserUpdateChema);

    const id = validateNumericProp(params.id, 'id');

    const userUpdated = await this.service.update(id, body);

    return userUpdated.toJSON();
  }

  async inactivate(req: Request) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id, 'id');

    await this.service.inactivate(id);
  }

  async reactivate(req: Request) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id, 'id');

    await this.service.reactivate(id);
  }
}
