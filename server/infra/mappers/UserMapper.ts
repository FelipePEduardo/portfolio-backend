import { UserQueryResponse, UserSearchQueryReponse } from '@infra/data/query-responses';
import { User } from '@models/User';
import { UserSearchDto } from 'server/DTO';

export default abstract class UserMapper {
  static mapOne(query: UserQueryResponse): User {
    return new User({
      id: query.id,
      name: query.name,
      email: query.email,
      password: query.password,
      isAdmin: query.admin === 1,
      createdAt: query.created_at,
      updateAt: query.updated_at,
      active: query.active === 1,
    });
  }

  static mapSearch(query: UserSearchQueryReponse[]): UserSearchDto[] {
    return query.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      active: row.active === 1,
    }));
  }
}
