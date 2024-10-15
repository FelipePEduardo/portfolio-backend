import { Router } from 'express';
import { IUserController } from '@interfaces/controllers';
import container from '@infra/IoC';

import { authMiddleware } from '@application/middlewares/authMiddleware';

const controller = container.get(IUserController);
const userRoutes = Router();

userRoutes.get('/search', authMiddleware, controller.search.bind(controller));
userRoutes.get('/:id', authMiddleware, controller.getById.bind(controller));
userRoutes.post('/', controller.create.bind(controller));
userRoutes.patch('/:id', authMiddleware, controller.update.bind(controller));
userRoutes.patch('/inactivate/:id', authMiddleware, controller.inactivate.bind(controller));
userRoutes.patch('/reactivate/:id', authMiddleware, controller.reactivate.bind(controller));

export default userRoutes;
