import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import container from '@infra/IoC';
import { IUserRepository } from '@interfaces/repositories';
import { User } from '@models/User';

const userRepository = container.get(IUserRepository);

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new Error('Invalid token');
  }

  try {
    const [, token] = authorization.split('Bearer ');

    jwt.verify(token, String(process.env.AUTH_SECRET));

    const decodedToken = jwt.decode(token);

    let user: User | undefined = undefined;

    if (decodedToken && typeof decodedToken === 'object') {
      user = await userRepository.getById(decodedToken.id);
    }

    if (!user) throw new Error('User not found');

    req.contextParams = user.toJSON();

    next();
  } catch {
    throw new Error('Invalid token');
  }
}
