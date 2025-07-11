import { User, UserPartial, UserRole } from '@models/User';
import { SearchResponse, UserSearchDto } from '@DTO';

export default abstract class IUserRepository {
  abstract getById(id: number): Promise<User | undefined>;
  abstract getPartialById(id: number): Promise<UserPartial | undefined>;
  abstract getByEmail(email: string): Promise<User | undefined>;
  abstract search(queryOptions: Record<string, unknown>): Promise<SearchResponse<UserSearchDto>>;
  abstract create(entity: User): Promise<User>;
  abstract update(entity: User): Promise<User>;
  abstract inactivate(id: number): Promise<void>;
  abstract reactivate(id: number): Promise<void>;

  /* User Role */
  abstract getUserRoleByid(id: number): Promise<UserRole | undefined>;
}
