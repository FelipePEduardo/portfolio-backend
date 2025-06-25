import { UserDto } from '@DTO';
import { Request, Response } from 'express';

export default abstract class IAuthController {
  abstract signIn(req: Request, res: Response): Promise<{ user: UserDto; token: string }>;
}
