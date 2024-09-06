import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IUserController } from '@interfaces/controllers';
import { IUserService } from '@interfaces/services';

@injectable()
export default class UserController implements IUserController {
  constructor(private service: IUserService) {}

  async search(req: Request, res: Response) {
    const response = await this.service.search();

    return res.json(response);
  }
}
