import { Container } from 'inversify';

import { ISkillController, IUserController } from '@interfaces/controllers';
import UserController from '@application/controllers/UserController';
import { SkillRepository, UserRepository } from '@infra/data/repositories';

import { ISkillService, IUserService } from '@interfaces/services';
import { SkillService, UserService } from '@services';

import { ISkillRepository, IUserRepository } from '@interfaces/repositories';
import SkillController from '@application/controllers/SkillController';

const container = new Container({ skipBaseClassChecks: true });
/* #region Repositories */

container.bind(IUserRepository).to(UserRepository);
container.bind(ISkillRepository).to(SkillRepository);

/* #endregion */

/* #region Services */

container.bind(IUserService).to(UserService);
container.bind(ISkillService).to(SkillService);

/* #endregion */

/* #region Controllers */

container.bind(IUserController).to(UserController);
container.bind(ISkillController).to(SkillController);

/* #endregion */

export default container;
