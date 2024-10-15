import { Container } from 'inversify';

import { IAuthController, ISkillController, IUserController } from '@interfaces/controllers';
import UserController from '@application/controllers/UserController';
import SkillController from '@application/controllers/SkillController';
import AuthController from '@application/controllers/AuthController';

import { IAuthService, ISkillService, IUserService } from '@interfaces/services';
import { AuthService, SkillService, UserService } from '@services';

import { ISkillRepository, IUserRepository } from '@interfaces/repositories';
import { SkillRepository, UserRepository } from '@infra/data/repositories';

const container = new Container({ skipBaseClassChecks: true });
/* #region Repositories */

container.bind(IAuthController).to(AuthController);
container.bind(IUserRepository).to(UserRepository);
container.bind(ISkillRepository).to(SkillRepository);

/* #endregion */

/* #region Services */

container.bind(IAuthService).to(AuthService);
container.bind(IUserService).to(UserService);
container.bind(ISkillService).to(SkillService);

/* #endregion */

/* #region Controllers */

container.bind(IUserController).to(UserController);
container.bind(ISkillController).to(SkillController);

/* #endregion */

export default container;
