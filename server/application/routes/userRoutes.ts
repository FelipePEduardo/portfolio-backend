import { Router } from 'express';
import { IUserController } from '@interfaces/controllers';
import container from '@infra/IoC';

const controller = container.get(IUserController);
const userRoutes = Router();

userRoutes.get('/', controller.search.bind(controller));

export default userRoutes;
