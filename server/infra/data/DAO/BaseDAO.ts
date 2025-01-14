import DatabaseConnection from '../DatabaseConnection';

export default class BaseDAO {
  protected connection = DatabaseConnection;

  constructor() {
    this.connection = DatabaseConnection;
  }
}
