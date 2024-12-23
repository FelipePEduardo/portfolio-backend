import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { IAuthController } from '@interfaces/controllers';
import { IAuthService } from '@interfaces/services';
import { getRequestInfo } from '@application/helpers';
import { SignInSchema } from '@DTO/Auth';

@injectable()
export default class AuthController implements IAuthController {
  constructor(private service: IAuthService) {}

  async signIn(req: Request, res: Response) {
    const { body } = getRequestInfo(req, SignInSchema);

    const loggedUser = await this.service.signIn(body);

    return res.status(200).send(loggedUser);
  }
}
