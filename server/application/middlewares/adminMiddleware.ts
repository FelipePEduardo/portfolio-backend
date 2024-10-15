import { Request, Response, NextFunction } from 'express';

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const { contextParams } = req;

  if (!contextParams) throw new Error('Unauthorized');

  if (contextParams.isAdmin) {
    next();
    return;
  }

  throw new Error('Unauthorized');
}
