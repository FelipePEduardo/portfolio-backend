export type SkillQueryResponse = {
  readonly id: number;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly active: number;
  readonly userId: number;
  readonly userName: string;
  readonly count: number;
};
