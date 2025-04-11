import { injectable } from 'inversify';

import BaseDAO from '../BaseDAO';
import 'dotenv/config';

import { IGithubDAO } from '@interfaces/DAO';
import axios from 'axios';
import { RepositoriesDto, UserInformationDto } from '@DTO/Github';

@injectable()
export default class GithubDAO extends BaseDAO implements IGithubDAO {
  private token = process.env.GITHUB_TOKEN;

  async getUserInformation() {
    return axios
      .get<UserInformationDto>('https://api.github.com/users/FelipePEduardo', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: this.token,
        },
      })
      .then((response) => response.data);
  }

  async getRepositories() {
    return axios
      .get<RepositoriesDto>('https://api.github.com/users/FelipePEduardo/repos?sort=pushed&per_page=12', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: this.token,
        },
      })
      .then((response) => response.data);
  }
}
