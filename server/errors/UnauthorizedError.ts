import CustomError from './CustomError';

/**
 * Custom error with message and status code 401
 */
export default class UnauthorizedError extends CustomError {
  /**
   * @param {string} message Error message
   */
  constructor(readonly message: string) {
    super(message, 401);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
