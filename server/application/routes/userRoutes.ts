import { Router } from 'express';
import { IUserController } from '@interfaces/controllers';
import container from '@infra/IoC';

const controller = container.get(IUserController);
const userRoutes = Router();

userRoutes.get('/search', controller.search.bind(controller));
userRoutes.get('/:id', controller.getById.bind(controller));
userRoutes.post('/', controller.create.bind(controller));
userRoutes.patch('/:id', controller.update.bind(controller));
userRoutes.patch('/inactivate/:id', controller.inactivate.bind(controller))
userRoutes.patch('/reactivate/:id', controller.reactivate.bind(controller))

export default userRoutes;
