import { ValidationError } from 'server/errors';

export function validateNumericProp(id: unknown, prop: string) {
  const valueAsNumber = Number(id);

  if (!Number.isSafeInteger(valueAsNumber) || valueAsNumber < 1) throw new ValidationError([prop]);

  return valueAsNumber;
}
