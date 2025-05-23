import { User } from '@models/User';
import { SearchReponse, UserCreateDto, UserSearchDto, UserUpdateDto } from 'server/DTO';

export default abstract class IUserService {
  abstract getById(id: number): Promise<User>;
  abstract search(queryOptions: Record<string, unknown>): Promise<SearchReponse<UserSearchDto>>;
  abstract create(dto: UserCreateDto): Promise<User>;
  abstract update(id: number, dto: UserUpdateDto): Promise<User>;
  abstract inactivate(id: number): Promise<void>;
  abstract reactivate(id: number): Promise<void>;
}
