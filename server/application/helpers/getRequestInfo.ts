import { Request } from 'express';
import { ZodSchema } from 'zod';

export function getRequestInfo(req: Request, schema?: ZodSchema) {
  const { body, params, query, contextParams } = req;

  let data = body;

  if (schema) {
    data = schema.parse(body);
  }

  return { body: data, params, query, contextParams };
}
