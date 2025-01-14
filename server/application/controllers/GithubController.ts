import { Request, Response } from 'express';
import { injectable } from 'inversify';

import { IGithubController } from '@interfaces/controllers';

import { IGithubDAO } from '@interfaces/DAO';

@injectable()
export default class GithubController implements IGithubController {
  constructor(private dao: IGithubDAO) {}

  async getUserInformation(req: Request, res: Response) {
    const githubUser = await this.dao.getUserInformation();

    return res.status(200).send(githubUser);
  }

  async getRepositories(req: Request, res: Response) {
    const repositories = await this.dao.getRepositories();

    return res.status(200).send(repositories);
  }
}
