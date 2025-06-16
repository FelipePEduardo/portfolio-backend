import { Request } from 'express';
import { injectable } from 'inversify';

import { IAuthController } from '@interfaces/controllers';
import { IAuthService } from '@interfaces/services';
import { SignInSchema } from '@DTO/Auth';
import { getAuthParamsFromRequest } from '@application/helpers/getAuthParamsFromRequest';

@injectable()
export default class AuthController implements IAuthController {
  constructor(private service: IAuthService) {}

  async signIn(req: Request) {
    const { email, password } = getAuthParamsFromRequest(req);

    const body = SignInSchema.parse({ email, password });

    return this.service.signIn(body);
  }
}
