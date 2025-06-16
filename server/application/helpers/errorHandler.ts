import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
  if (!error) next();

  res.status(400).send('Internal Server error');
}
