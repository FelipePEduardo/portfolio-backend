import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IUserController } from '@interfaces/controllers';
import { IUserService } from '@interfaces/services';
import { getRequestInfo, validateNumericProp } from '@application/helpers';
import { UserCreateSchema, UserUpdateChema } from '@DTO/User';

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async getById(req: Request, res: Response) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id);

    const user = await this.service.getById(id);

    return res.json(user.toJSON());
  }

  async search(req: Request, res: Response) {
    const { query } = getRequestInfo(req);

    const response = await this.service.search(query);

    return res.json(response);
  }

  async create(req: Request, res: Response) {
    const { body } = getRequestInfo(req, UserCreateSchema);

    const userCreated = await this.service.create(body);

    return res.status(201).json(userCreated.toJSON());
  }

  async update(req: Request, res: Response) {
    const { body, params } = getRequestInfo(req, UserUpdateChema);

    const id = validateNumericProp(params.id);

    const userUpdated = await this.service.update(id, body);

    return res.status(200).json(userUpdated.toJSON());
  }

  async inactivate(req: Request, res: Response) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id);

    await this.service.inactivate(id);

    return res.sendStatus(204);
  }

  async reactivate(req: Request, res: Response) {
    const { params } = getRequestInfo(req);

    const id = validateNumericProp(params.id);

    await this.service.reactivate(id);

    return res.sendStatus(204);
  }
}
