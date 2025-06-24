import CustomError from './CustomError';
/**
 * Custom error with generated message and status code 404
 */
export default class EntityNotFound extends CustomError {
  /**
   * @param {string} entityName Receive entity name
   * @param {string|number} id Receive entity identifier (Id or IdSync)
   */
  constructor(
    readonly entityName: string,
    readonly id: string | number,
  ) {
    const identityType = typeof id === 'number' ? 'Id' : 'IdSync';
    const message = `${entityName} not found (${identityType}: ${String(id)})`;
    super(message, 404);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
