import { Request } from 'express';

export function getAuthParamsFromRequest(req: Request) {
  if (!req.headers.authorization) throw new Error('Unauthorized');

  const base64 = req.headers.authorization.split(' ')[1];
  const [email, password] = Buffer.from(base64, 'base64').toString().split(':');

  if (!email || !password) throw new Error('Invalid Credentials');

  return { email, password };
}
