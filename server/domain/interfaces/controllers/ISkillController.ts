import { Request, Response } from 'express';

export default abstract class ISkillController {
  abstract getById(req: Request, res: Response): Promise<Response>;
  abstract search(req: Request, res: Response): Promise<Response>;
  abstract create(req: Request, res: Response): Promise<Response>;
  abstract update(req: Request, res: Response): Promise<Response>;
  abstract delete(req: Request, res: Response): Promise<Response>;
}
