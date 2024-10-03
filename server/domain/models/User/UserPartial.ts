import { EntityPartial, IEntityPartial } from '@models/EntityPartial';

export interface IUserPartial extends IEntityPartial {
  name: string;
}

export class UserPartial extends EntityPartial {
  readonly name: string;

  constructor(props: IUserPartial) {
    super(props);
    this.name = props.name;
  }
}
