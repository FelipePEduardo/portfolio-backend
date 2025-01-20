import { ContextParams } from "@DTO/ContexParams";

export function validateContextParams(contextParams: ContextParams | undefined) {
  if (!contextParams) throw new Error('You are not logged');

  return contextParams;
}
