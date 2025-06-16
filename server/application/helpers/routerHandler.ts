import { NextFunction, Request, Response } from 'express';

type OptionsType = {
  status: number;
};

type ExpressFunction<T> = (req: Request, res: Response) => Promise<T>;

async function handleFuntion<T>(
  fn: ExpressFunction<T>,
  req: Request,
  res: Response,
  next: NextFunction,
  config: OptionsType,
): Promise<Response> {
  try {
    const result = await fn(req, res);

    return res.json(result).status(config.status);
  } catch (error) {
    next(error);
  }
}

export const routerHandler =
  <T, K extends keyof T>(controllerInstance: T, functionName: K, options: OptionsType) =>
  (req: Request, res: Response, next: NextFunction) =>
    handleFuntion<T>(
      // @ts-ignore
      (controllerInstance[functionName] as ExpressFunction<unknown>).bind(controllerInstance),
      req,
      res,
      next,
      options,
    );
