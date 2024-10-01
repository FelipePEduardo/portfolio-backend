import { injectable } from 'inversify';
import { IUserRepository } from '@interfaces/repositories';
import BaseRepository from './BaseRepository';
import { getCountFromResponse } from './helpers';
import UserMapper from '@infra/mappers/UserMapper';
import { UserSearchQueryReponse } from '../query-responses';
import { User } from '@models/User';

@injectable()
export default class UserRepository extends BaseRepository implements IUserRepository {
  async getById(id: number) {
    const query = await this.connection('users').select('*').where('id', id).first();

    if (!query) return undefined;

    return UserMapper.mapOne(query);
  }

  async getByEmail(email: string) {
    const query = await this.connection('users').select('*').where('email', email).first();

    if (!query) return undefined;

    return UserMapper.mapOne(query);
  }

  async search() {
    const query = await this.connection('users').select<UserSearchQueryReponse[]>(
      'id',
      'name',
      'email',
      'active',
      this.connection.raw('COUNT(*) OVER() as count'),
    );

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

  async inactivate(id: number): Promise<void> {
    await this.connection('users').update({ active: false }).where('id', id).andWhere('active', true);
  }

  async reactivate(id: number): Promise<void> {
    await this.connection('users').update({ active: true }).where('id', id).andWhere('active', false);
  }

  /* #region private methods */

  private mountUserToCreate(entity: User) {
    return {
      name: entity.getName(),
      email: entity.getEmail(),
      password: entity.getPassword(),
      is_admin: entity.isAdmin,
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
