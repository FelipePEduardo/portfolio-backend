import { UserDto, UserRoleDto } from '@DTO/User';
import { EntityBase, IEntityBase } from '@models/EntityBase';
import { UserRole } from './UserRole';

interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  userRole?: UserRoleDto;
}

export interface IUser extends IEntityBase {
  name: string;
  email: string;
  password: string;
  userRole: UserRole;
}

export class User extends EntityBase {
  protected name: string;
  protected email: string;
  protected password: string;
  protected userRole: UserRole;

  constructor(props: IUser) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.userRole = props.userRole;
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

  public getUserRole() {
    return this.userRole;
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

  public setUserRole(userRole: UserRole) {
    this.userRole = userRole;
  }

  /* #endregion */

  public update(dto: IUserUpdate) {
    const settersDictionary = {
      name: this.setName,
      email: this.setEmail,
      password: this.setPassword,
      userRole: this.setUserRole,
    };

    this.applyChanges(dto, settersDictionary);
  }

  public toJSON(): UserDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      active: this.active,
      userRole: this.userRole.toJSON(),
    };
  }
}
