import { Request, Response } from 'express';

export default abstract class IGithubController {
  abstract getUserInformation(req: Request, res: Response): Promise<Response>;
  abstract getRepositories(req: Request, res: Response): Promise<Response>;
}
