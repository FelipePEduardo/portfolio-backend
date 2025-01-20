import { Request, Response, NextFunction } from 'express';

export async function masterMiddleware(req: Request, res: Response, next: NextFunction) {
  const { contextParams } = req;

  if (!contextParams) throw new Error('Unauthorized');

  if (contextParams.userRole.name === 'MASTER') {
    next();
    return;
  }

  throw new Error('Unauthorized');
}
