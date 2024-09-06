import { injectable } from 'inversify';
import { IUserRepository } from '@interfaces/repositories';

@injectable()
export default class UserRepository implements IUserRepository {
  async search() {
    return { hello: 'Hello World' };
  }
}
