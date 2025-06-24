import CustomError from './CustomError';

/**
 * Custom error with message and status code 403
 */
export default class ForbiddenError extends CustomError {
  /**
   * @param {string} message Error message
   */
  constructor(readonly message: string) {
    super(message, 403);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
