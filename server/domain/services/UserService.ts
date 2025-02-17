import { injectable } from 'inversify';
import { IUserService } from '@interfaces/services';
import { IUserRepository } from '@interfaces/repositories';
import { EnumUserRoles, User } from '@models/User';
import { UserCreateDto, UserUpdateDto } from 'server/DTO';
import bcrypt from 'bcrypt';

@injectable()
export default class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}

  async getById(id: number) {
    const user = await this.repository.getById(id);

    if (!user) throw new Error('User not found');

    return user;
  }

  async search(queryOptions: Record<string, unknown>) {
    return this.repository.search(queryOptions);
  }

  async create(dto: UserCreateDto) {
    await this.validateIfEmailAlreadyExists(dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const userRole = await this.getUserRole('USER');

    const userToCreate = new User({ ...dto, password: hashedPassword, userRole });

    return this.repository.create(userToCreate);
  }

  async update(id: number, dto: UserUpdateDto) {
    const user = await this.getById(id);

    const hasChangedEmail = user.getEmail() !== dto.email;

    if (hasChangedEmail) await this.validateIfEmailAlreadyExists(dto.email);

    const newPasswordHashed = await this.validateOldAndNewPassword(dto.oldPassword, dto.newPassword, user.getPassword());

    const userRole = await this.getUserRole(dto.userRole);

    user.update({ name: dto.name, email: dto.email, password: newPasswordHashed, userRole });

    return this.repository.update(user);
  }

  async inactivate(id: number): Promise<void> {
    const user = await this.getById(id);

    await this.repository.inactivate(user.id);
  }

  async reactivate(id: number): Promise<void> {
    const user = await this.getById(id);

    await this.repository.reactivate(user.id);
  }

  /* #region Private */

  private async validateIfEmailAlreadyExists(email: string | undefined) {
    if (email) {
      const emailAlreadyExists = await this.repository.getByEmail(email);

      if (emailAlreadyExists) throw new Error('Email already exists');
    }
  }

  private async validateOldAndNewPassword(
    oldPassword: string | undefined,
    newPassword: string | undefined,
    userPassword: string,
  ) {
    if (oldPassword && newPassword) {
      const passwordMatch = await bcrypt.compare(oldPassword, userPassword);

      if (!passwordMatch) throw new Error('Invalid password');

      return bcrypt.hash(newPassword, 10);
    }
  }

  private async getUserRole(role: 'USER' | 'ADMIN' | 'MASTER') {
    const userRoleId = EnumUserRoles[role];

    const userRole = await this.repository.getUserRoleByid(userRoleId);

    if (!userRole) throw new Error('User role not found');

    return userRole;
  }

  /* #endregion */
}
