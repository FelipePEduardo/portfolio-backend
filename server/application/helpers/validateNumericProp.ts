export function validateNumericProp(id: unknown) {
  const valueAsNumber = Number(id);

  if (!Number.isSafeInteger(valueAsNumber) || valueAsNumber < 1) throw new Error('Invalid parameter');

  return valueAsNumber;
}
