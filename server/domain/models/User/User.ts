import { UserDto } from '@DTO/User';
import { EntityBase, IEntityBase } from '@models/EntityBase';

interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface IUser extends IEntityBase {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export class User extends EntityBase {
  protected name: string;
  protected email: string;
  protected password: string;
  readonly isAdmin: boolean;

  constructor(props: IUser) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.isAdmin = props.isAdmin;
  }

  /* #region Getters */

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  /* #endregion */

  /* #region Setters */

  public setName(name: string) {
    this.name = name;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  /* #endregion */

  public update(dto: IUserUpdate) {
    const settersDictionary = {
      name: this.setName,
      email: this.setEmail,
      password: this.setPassword,
    };

    this.applyChanges(this, dto, settersDictionary)
  }

  public toJSON(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
      isAdmin: this.isAdmin,
    };
  }
}
