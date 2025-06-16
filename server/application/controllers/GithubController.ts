import { injectable } from 'inversify';

import { IGithubController } from '@interfaces/controllers';

import { IGithubDAO } from '@interfaces/DAO';

@injectable()
export default class GithubController implements IGithubController {
  constructor(private dao: IGithubDAO) {}

  async getUserInformation() {
    return this.dao.getUserInformation();
  }

  async getRepositories() {
    return this.dao.getRepositories();
  }
}
