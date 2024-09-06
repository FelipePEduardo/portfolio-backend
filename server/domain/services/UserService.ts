import { injectable } from 'inversify';
import { IUserService } from '@interfaces/services';
import { IUserRepository } from '@interfaces/repositories';

@injectable()
export default class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}

  async search() {
    return this.repository.search();
  }
}
