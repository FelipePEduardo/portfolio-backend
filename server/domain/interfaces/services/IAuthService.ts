import { SignInDto } from '@DTO/Auth';
import { UserDto } from '@DTO/User';

export default abstract class IAuthService {
  abstract signIn(body: SignInDto): Promise<{ user: UserDto; token: string }>;
}
