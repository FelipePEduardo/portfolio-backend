import 'dotenv/config';

import { injectable } from 'inversify';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

import { IAuthService } from '@interfaces/services';
import { IUserRepository } from '@interfaces/repositories';
import { SignInDto } from '@DTO/Auth';

@injectable()
export default class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async signIn({ email, password }: SignInDto) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) throw new Error('Email or password invalid');

    const passwordMatch = await compare(password, user.getPassword());

    if (!passwordMatch) throw new Error('Email or password invalid');

    const token = jwt.sign({ id: user.id }, String(process.env.AUTH_SECRET), { expiresIn: '7d' });

    return { user: user.toJSON(), token };
  }
}
