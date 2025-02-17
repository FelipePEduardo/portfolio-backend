import { Router } from 'express';
import { IUserController } from '@interfaces/controllers';
import container from '@infra/IoC';

import { authMiddleware } from '@application/middlewares/authMiddleware';
import { masterOrAdminMiddleware } from '@application/middlewares/masterOrAdminMiddleware';

const controller = container.get(IUserController);
const userRoutes = Router();

userRoutes.get('/search', authMiddleware, masterOrAdminMiddleware, controller.search.bind(controller));
userRoutes.get('/:id', authMiddleware, masterOrAdminMiddleware, controller.getById.bind(controller));
userRoutes.post('/', controller.create.bind(controller));
userRoutes.patch('/:id', authMiddleware, masterOrAdminMiddleware, controller.update.bind(controller));
userRoutes.patch('/inactivate/:id', authMiddleware, masterOrAdminMiddleware, controller.inactivate.bind(controller));
userRoutes.patch('/reactivate/:id', authMiddleware, masterOrAdminMiddleware, controller.reactivate.bind(controller));

export default userRoutes;
