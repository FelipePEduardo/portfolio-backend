import { Request } from 'express';
import { SignInSchema } from '@DTO/Auth';
import { UnauthorizedError, ValidationError } from 'server/errors';

export function getAuthParamsFromRequest(req: Request) {
  if (!req.headers.authorization) throw new UnauthorizedError('Unauthorized');

  const base64 = req.headers.authorization.split(' ')[1];
  const [email, password] = Buffer.from(base64, 'base64').toString().split(':');

  if (!email || !password) throw new UnauthorizedError('Invalid Credentials');

  const parsed = SignInSchema.safeParse({ email, password });

  if (!parsed.success) {
    const errors = parsed.error.issues.flatMap((i) => i.path).filter((i) => typeof i === 'string');
    throw new ValidationError(errors);
  }

  return parsed.data;
}
