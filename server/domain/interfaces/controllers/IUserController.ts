import { Request, Response } from 'express';

export default abstract class IUserController {
  abstract getById(req: Request, res: Response): Promise<Response>;
  abstract search(req: Request, res: Response): Promise<Response>;
  abstract create(req: Request, res: Response): Promise<Response>;
  abstract update(req: Request, res: Response): Promise<Response>;
  abstract inactivate(req: Request, res: Response): Promise<Response>;
  abstract reactivate(req: Request, res: Response): Promise<Response>;
}
