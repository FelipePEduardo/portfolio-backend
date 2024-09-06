import { Container } from 'inversify';

import { IUserController } from '@interfaces/controllers';
import UserController from '@application/controllers/UserController';

import { IUserService } from '@interfaces/services';
import { UserService } from '@services';

import { IUserRepository } from '@interfaces/repositories';
import { UserRepository } from '@infra/data/repositories';

const container = new Container();

/* #region Repositories */

container.bind(IUserRepository).to(UserRepository);

/* #endregion */

/* #region Services */

container.bind(IUserService).to(UserService);

/* #endregion */

/* #region Controllers */

container.bind(IUserController).to(UserController);

/* #endregion */

export default container;
