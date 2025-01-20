import { UserRoleDto } from '@DTO/User';

export interface IUserRole {
  id: number;
  name: string;
}

export class UserRole {
  readonly id: number;
  readonly name: string;

  constructor(props: IUserRole) {
    this.id = props.id;
    this.name = props.name;
  }

  public toJSON(): UserRoleDto {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
