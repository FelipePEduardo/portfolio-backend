import { Request, Response, NextFunction } from 'express';

export function errorHandler(error: unknown, _: Request, res: Response, next: NextFunction) {
  if (!error) next();

  const internalServerErrorMessage = 'Internal Server error';

  if (error instanceof Error) {
    if ('httpStatus' in error && typeof error.httpStatus === 'number') {
      const { httpStatus, message } = error;

      return res.status(httpStatus).type('application/json').send({ message });
    }

    return res.status(500).type('application/json').send({ message: internalServerErrorMessage });
  }

  return res.status(500).type('application/json').send({ message: internalServerErrorMessage });
}
