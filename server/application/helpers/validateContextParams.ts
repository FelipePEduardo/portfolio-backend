import { ContextParams } from "@DTO/ContexParams";
import { UnauthorizedError } from "server/errors";

export function validateContextParams(contextParams: ContextParams | undefined) {
  if (!contextParams) throw new UnauthorizedError('You are not logged');

  return contextParams;
}
