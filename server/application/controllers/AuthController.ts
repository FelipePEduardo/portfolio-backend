import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { IAuthController } from '@interfaces/controllers';
import { IAuthService } from '@interfaces/services';
import { SignInSchema } from '@DTO/Auth';
import { getAuthParamsFromRequest } from '@application/helpers/getAuthParamsFromRequest';

@injectable()
export default class AuthController implements IAuthController {
  constructor(private service: IAuthService) {}

  async signIn(req: Request, res: Response) {
    const { email, password } = getAuthParamsFromRequest(req);

    const body = SignInSchema.parse({ email, password });

    const loggedUser = await this.service.signIn(body);

    return res.status(200).send(loggedUser);
  }
}
