export type UserQueryResponse = {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly is_admin: number;
  readonly created_at: Date;
  readonly updated_at: Date | null;
  readonly active: number;
};
