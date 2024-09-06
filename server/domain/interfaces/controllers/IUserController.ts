import { Request, Response } from 'express';

export default abstract class IUserController {
  abstract search(req: Request, res: Response): Promise<Response>;
}
