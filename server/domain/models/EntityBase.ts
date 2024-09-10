export interface IEntityBase {
  id: number;
  active: boolean;
  createdAt: Date;
  updateAt: Date | null;
}

export abstract class EntityBase {
  readonly id: number;
  readonly active: boolean;
  readonly createdAt: Date;
  protected updateAt: Date | null;

  constructor(props: IEntityBase) {
    this.id = props.id ?? 0;
    this.createdAt = props.createdAt ?? new Date();
    this.updateAt = props.updateAt ?? null;
    this.active = props.active ?? true;
  }

  /* #region Getters */

  public getUpdatedAt() {
    return this.updateAt;
  }

  /* #endregion */

  /* #region Setters */

  public setUpdatedAt() {
    this.updateAt = new Date();
  }

  /* #endregion */
}
