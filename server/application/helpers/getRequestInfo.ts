import { Request } from 'express';
import { ValidationError } from 'server/errors';
import { ZodSchema } from 'zod';

export function getRequestInfo(req: Request, schema?: ZodSchema) {
  const { body, params, query, contextParams } = req;

  let data = body;

  if (schema) {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.flatMap((i) => i.path).filter((i) => typeof i === 'string');
      throw new ValidationError(errors);
    }
    data = parsed.data;
  }

  return { body: data, params, query, contextParams };
}
