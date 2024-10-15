import { SignInDto } from '@DTO/Auth';

export default abstract class IAuthService {
  abstract signIn(body: SignInDto): Promise<string>;
}
