import CustomError from './CustomError';
/**
 * Custom error with validation message and status code 400
 */
export default class ValidationError extends CustomError {
  /**
   * @param {string[]} fields Array of invalid fields
   */
  constructor(readonly fields: Array<string | number | symbol>) {
    const fieldsAsString = fields.join(', ');
    super(`Fields are invalid: [${fieldsAsString}]`, 400);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
