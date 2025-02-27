import { SkillDto } from '@DTO/Skill';
import { EntityBase, IEntityBase } from '@models/EntityBase';

import { UserPartial } from '@models/User/UserPartial';

interface ISkillUpdate {
  name?: string;
}

export interface ISkill extends IEntityBase {
  name: string;
  user: UserPartial;
}

export class Skill extends EntityBase {
  protected name: string;
  readonly user: UserPartial;

  constructor(props: ISkill) {
    super(props);
    this.name = props.name;
    this.user = props.user;
  }

  /* #region Getters */

  public getName() {
    return this.name;
  }

  /* #endregion */

  /* #region Setters */

  public setName(name: string) {
    this.name = name;
  }

  /* #endregion */

  public update(dto: ISkillUpdate) {
    const settersDictionary = {
      name: this.setName,
    };

    this.applyChanges(dto, settersDictionary);
  }

  public toDto(): SkillDto {
    return {
      id: this.id,
      name: this.name,
      active: this.active,
      user: {
        id: this.user.id,
        name: this.user.name,
      },
    };
  }
}
