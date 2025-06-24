import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import container from '@infra/IoC';
import { IUserRepository } from '@interfaces/repositories';
import { User } from '@models/User';
import { EntityNotFound, UnauthorizedError } from 'server/errors';

const userRepository = container.get(IUserRepository);

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      next(new UnauthorizedError('Invalid token'));
      return;
    }

    const [, token] = authorization.split('Bearer ');

    jwt.verify(token, String(process.env.AUTH_SECRET));

    const decodedToken = jwt.decode(token);

    let user: User | undefined = undefined;

    if (decodedToken && typeof decodedToken === 'object') {
      user = await userRepository.getById(decodedToken.id);
    }

    if (!user) {
      next(new EntityNotFound('User not found', 404));
      return;
    }

    req.contextParams = user.toJSON();

    next();
  } catch (error) {
    next(error);
  }
}
