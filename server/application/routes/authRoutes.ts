import { Router } from 'express';
import container from '@infra/IoC';

import { IAuthController } from '@interfaces/controllers';

const controller = container.get(IAuthController);
const authRoutes = Router();

authRoutes.post('/sign-in', controller.signIn.bind(controller))

export default authRoutes