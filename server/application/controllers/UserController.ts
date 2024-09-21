import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IUserController } from '@interfaces/controllers';
import { IUserService } from '@interfaces/services';
import { validateNumericProp } from '@application/helpers';

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async getById(req: Request, res: Response) {
    const { params } = req;

    const id = validateNumericProp(params.id);

    const user = await this.service.getById(id);

    return res.json(user.toDto());
  }

  async search(req: Request, res: Response) {
    const { query } = req;

    const response = await this.service.search(query);

    return res.json(response);
  }

  async create(req: Request, res: Response) {
    const { body } = req;

    const userCreated = await this.service.create(body);

    return res.status(201).json(userCreated.toDto());
  }

  async update(req: Request, res: Response) {
    const { body, params } = req;

    const id = validateNumericProp(params.id);

    const userUpdated = await this.service.update(id, body);

    return res.status(200).json(userUpdated.toDto());
  }

  async inactivate(req: Request, res: Response) {
    const { params } = req;

    const id = validateNumericProp(params.id);

    await this.service.inactivate(id);

    return res.status(204).send();
  }

  async reactivate(req: Request, res: Response) {
    const { params } = req;

    const id = validateNumericProp(params.id);

    await this.service.reactivate(id);

    return res.status(204).send();
  }
}
