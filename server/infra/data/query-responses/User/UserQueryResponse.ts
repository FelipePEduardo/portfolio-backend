export type UserQueryResponse = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date | null;
  readonly active: number;
  readonly userRoleId: number;
  readonly userRoleName: string;
};
