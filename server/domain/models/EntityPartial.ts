export interface IEntityPartial {
  id: number;
}

export abstract class EntityPartial {
  readonly id: number;

  constructor(props: IEntityPartial) {
    this.id = props.id;
  }
}
