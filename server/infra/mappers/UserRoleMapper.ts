import { UserRoleQueryResponse } from '@infra/data/query-responses';
import { UserRole } from '@models/User/UserRole';

export default abstract class UserRoleMapper {
  static mapOne(query: UserRoleQueryResponse) {
    return new UserRole({ id: query.id, name: query.name });
  }
}
