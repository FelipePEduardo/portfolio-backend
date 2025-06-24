import { Router } from 'express';
import container from '@infra/IoC';

import { IAuthController, IGithubController, ISkillController, IUserController } from '@interfaces/controllers';

import { routerHandler } from '@application/helpers/routerHandler';
import { authMiddleware } from '@application/middlewares/authMiddleware';
import { masterMiddleware } from '@application/middlewares/masterMiddleware';
import { masterOrAdminMiddleware } from '@application/middlewares/masterOrAdminMiddleware';

const authController = container.get(IAuthController);
const githubController = container.get(IGithubController);
const skillController = container.get(ISkillController);
const userController = container.get(IUserController);

const routes = Router();

/* Auth */
routes.post('/auth/sign-in', routerHandler(authController, 'signIn', { status: 200 }));

/* Github */
routes.get('/github/user', routerHandler(githubController, 'getUserInformation', { status: 200 }));
routes.get('/github/repos', routerHandler(githubController, 'getRepositories', { status: 200 }));

/* Skills */
routes.get('/skills/search', routerHandler(skillController, 'search', { status: 200 }));
routes.get('/skills/:id', authMiddleware, masterMiddleware, routerHandler(skillController, 'getById', { status: 200 }));
routes.post('/skills/', authMiddleware, masterMiddleware, routerHandler(skillController, 'create', { status: 201 }));
routes.patch('/skills/:id', authMiddleware, masterMiddleware, routerHandler(skillController, 'update', { status: 200 }));
routes.delete('/skills/:id', authMiddleware, masterMiddleware, routerHandler(skillController, 'delete', { status: 204 }));

/* User */
routes.get('/users/search', authMiddleware, masterOrAdminMiddleware, routerHandler(userController, 'search', { status: 200 }));
routes.get('/users/:id', authMiddleware, masterOrAdminMiddleware, routerHandler(userController, 'getById', { status: 200 }));
routes.post('/users/', routerHandler(userController, 'create', { status: 201 }));
routes.patch('/users/:id', authMiddleware, masterOrAdminMiddleware, routerHandler(userController, 'update', { status: 200 }));
routes.patch(
  '/users/inactivate/:id',
  authMiddleware,
  masterOrAdminMiddleware,
  routerHandler(userController, 'inactivate', { status: 204 }),
);
routes.patch(
  '/users/reactivate/:id',
  authMiddleware,
  masterOrAdminMiddleware,
  routerHandler(userController, 'reactivate', { status: 204 }),
);

export default routes;
