import { Router } from 'express';
import container from '@infra/IoC';
import { ISkillController } from '@interfaces/controllers';
import { authMiddleware } from '@application/middlewares/authMiddleware';
import { masterMiddleware } from '@application/middlewares/masterMiddleware';

const controller = container.get(ISkillController);
const skillRoutes = Router();

skillRoutes.get('/search', controller.search.bind(controller));
skillRoutes.get('/:id', authMiddleware, masterMiddleware, controller.getById.bind(controller));
skillRoutes.post('/', authMiddleware, masterMiddleware, controller.create.bind(controller));
skillRoutes.patch('/:id', authMiddleware, masterMiddleware, controller.update.bind(controller));
skillRoutes.delete('/:id', authMiddleware, masterMiddleware, controller.delete.bind(controller));

export default skillRoutes;
