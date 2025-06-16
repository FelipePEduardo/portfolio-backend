import { Request, Response, NextFunction } from 'express';

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const { contextParams } = req;

  if (!contextParams) throw new Error('Unauthorized');

  if (contextParams.userRole.name === 'ADMIN') {
    next();
    return;
  }

  next(new Error('Unauthorized'));
}
