import { SignInDto, UserDto } from '@DTO';

export default abstract class IAuthService {
  abstract signIn(body: SignInDto): Promise<{ user: UserDto; token: string }>;
}
