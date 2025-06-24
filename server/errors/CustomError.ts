export default class CustomError extends Error {
  readonly httpStatus: number;
  /**
   * @param {string} message Error message
   * @param {number} httpStatus Http status
   */
  constructor(message: string, httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
