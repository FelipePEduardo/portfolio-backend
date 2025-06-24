import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from 'server/errors';

export async function masterMiddleware(req: Request, res: Response, next: NextFunction) {
  const { contextParams } = req;

  if (!contextParams) throw new UnauthorizedError('Unauthorized');

  if (contextParams.userRole.name === 'MASTER') {
    next();
    return;
  }

  next(new ForbiddenError('Operation not permitted'));
}
