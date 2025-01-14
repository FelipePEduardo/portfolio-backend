import { Router } from 'express';
import container from '@infra/IoC';
import { ISkillController } from '@interfaces/controllers';
import { adminMiddleware } from '@application/middlewares/adminMiddleware';
import { authMiddleware } from '@application/middlewares/authMiddleware';

const controller = container.get(ISkillController);
const skillRoutes = Router();

skillRoutes.get('/search', controller.search.bind(controller));
skillRoutes.get('/:id', authMiddleware, adminMiddleware, controller.getById.bind(controller));
skillRoutes.post('/', authMiddleware, adminMiddleware, controller.create.bind(controller));
skillRoutes.patch('/:id', authMiddleware, adminMiddleware, controller.update.bind(controller));
skillRoutes.delete('/:id', authMiddleware, adminMiddleware, controller.delete.bind(controller));

export default skillRoutes;
