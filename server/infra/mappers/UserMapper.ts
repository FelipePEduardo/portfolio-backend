import { UserPartialQueryResponse, UserQueryResponse, UserSearchQueryReponse } from '@infra/data/query-responses';
import { User, UserPartial, UserRole } from '@models/User';
import { UserSearchDto } from 'server/DTO';

export default abstract class UserMapper {
  static mapOne(query: UserQueryResponse): User {
    return new User({
      id: query.id,
      name: query.name,
      email: query.email,
      password: query.password,
      createdAt: query.createdAt,
      updateAt: query.updatedAt,
      active: query.active === 1,
      userRole: new UserRole({ id: query.userRoleId, name: query.userRoleName }),
    });
  }

  static mapPartial(query: UserPartialQueryResponse): UserPartial {
    return new UserPartial({
      id: query.id,
      name: query.name,
    });
  }

  static mapSearch(query: UserSearchQueryReponse[]): UserSearchDto[] {
    return query.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      active: row.active === 1,
      userRole: {
        id: row.userRoleId,
        name: row.userRoleName,
      },
    }));
  }
}
