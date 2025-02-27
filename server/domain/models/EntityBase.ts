export interface IEntityBase {
  id?: number;
  active?: boolean;
  createdAt?: Date;
  updateAt?: Date | null;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type SettersDictionaryType<T> = Record<keyof T, Function>;

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

  public applyChanges<T extends object>(entity: T, settersDictionary: SettersDictionaryType<T>) {
    Object.entries(entity).forEach(([key, value]) => {
      if (settersDictionary[key as keyof T] !== undefined && value !== undefined)
        settersDictionary[key as keyof T].bind(this)(value);
    });

    this.setUpdatedAt();
  }
}
