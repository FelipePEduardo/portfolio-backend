import { RepositoriesDto, UserInformationDto } from '@DTO/Github';
import { Request, Response } from 'express';

export default abstract class IGithubController {
  abstract getUserInformation(req: Request, res: Response): Promise<UserInformationDto>;
  abstract getRepositories(req: Request, res: Response): Promise<RepositoriesDto>;
}
