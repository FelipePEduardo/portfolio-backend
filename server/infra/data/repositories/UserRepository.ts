import { injectable } from 'inversify';
import { IUserRepository } from '@interfaces/repositories';
import BaseRepository from './BaseRepository';
import { getCountFromResponse } from './helpers';
import UserMapper from '@infra/mappers/UserMapper';
import { UserPartialQueryResponse, UserQueryResponse, UserRoleQueryResponse, UserSearchQueryReponse } from '../query-responses';
import { User } from '@models/User';
import UserRoleMapper from '@infra/mappers/UserRoleMapper';

@injectable()
export default class UserRepository extends BaseRepository implements IUserRepository {
  async getById(id: number) {
    const query = await this.connection('users')
      .select<UserQueryResponse>(
        'users.id',
        'users.name',
        'users.email',
        'users.password',
        'users.created_at as createdAt',
        'users.updated_at as updatedAt',
        'users.active',
        'user_role.id as userRoleId',
        'user_role.name as userRoleName',
      )
      .innerJoin('user_role', 'users.user_role_id', 'user_role.id')
      .where('users.id', id)
      .first();

    if (!query) return undefined;

    return UserMapper.mapOne(query);
  }

  async getPartialById(id: number) {
    const query = await this.connection('users').select<UserPartialQueryResponse>('id', 'name').where('id', id).first();

    if (!query) return undefined;

    return UserMapper.mapPartial(query);
  }

  async getByEmail(email: string) {
    const query = await this.connection('users')
      .select<UserQueryResponse>(
        'users.id',
        'users.name',
        'users.email',
        'users.password',
        'users.created_at as createdAt',
        'users.updated_at as updatedAt',
        'users.active',
        'user_role.id as userRoleId',
        'user_role.name as userRoleName',
      )
      .innerJoin('user_role', 'users.user_role_id', 'user_role.id')
      .where('email', email)
      .first();

    if (!query) return undefined;

    return UserMapper.mapOne(query);
  }

  async search(queryOptions: Record<string, unknown>) {
    const query = await this.connection('users')
      .innerJoin('user_role', 'users.user_role_id', 'user_role.id')
      .select<UserSearchQueryReponse[]>(
        'users.id', 
        'users.name', 
        'users.email', 
        'users.active', 
        'user_role.id as userRoleId', 
        'user_role.name as userRoleName', 
        this.connection.raw('COUNT(*) OVER() as count')
      );
    // .where('name', 'like', `%${queryOptions.name}%`);

    return { count: getCountFromResponse(query), data: UserMapper.mapSearch(query) };
  }

  async create(entity: User) {
    const userToCreate = this.mountUserToCreate(entity);

    const [createdId] = await this.connection('users').insert(userToCreate);

    const userCreated = await this.getById(createdId);

    if (!userCreated) throw new Error('Error while creating user');

    return userCreated;
  }

  async update(entity: User) {
    const userToUpdate = this.mountUserToUpdate(entity);

    await this.connection('users').update(userToUpdate).where('id', entity.id);

    const updatedUser = await this.getById(entity.id);

    if (!updatedUser) throw new Error('Error while updating user');

    return updatedUser;
  }

  async inactivate(id: number) {
    await this.connection('users').update({ active: false }).where('id', id).andWhere('active', true);
  }

  async reactivate(id: number) {
    await this.connection('users').update({ active: true }).where('id', id).andWhere('active', false);
  }

  /* #region User Role */

  async getUserRoleByid(id: number) {
    const query = await this.connection<UserRoleQueryResponse>('user_role').select('*').where('id', id).first();

    if (!query) return undefined;

    return UserRoleMapper.mapOne(query);
  }

  /* #endregion */

  /* #region private methods */

  private mountUserToCreate(entity: User) {
    return {
      name: entity.getName(),
      email: entity.getEmail(),
      password: entity.getPassword(),
      user_role_id: entity.getUserRole().id,
      created_at: entity.createdAt,
      updated_at: entity.getUpdatedAt(),
      active: entity.active,
    };
  }

  private mountUserToUpdate(entity: User) {
    return {
      name: entity.getName(),
      email: entity.getEmail(),
      password: entity.getPassword(),
      updated_at: entity.getUpdatedAt(),
    };
  }

  /* #endregion */
}
