import DatabaseConnection from '../DatabaseConnection';

export default class BaseRepository {
  protected connection = DatabaseConnection;

  constructor() {
    this.connection = DatabaseConnection;
  }
}
