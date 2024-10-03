import { Router } from 'express';
import container from '@infra/IoC';
import { ISkillController } from '@interfaces/controllers';

const controller = container.get(ISkillController);
const skillRoutes = Router();

skillRoutes.get('/search', controller.search.bind(controller));
skillRoutes.get('/:id', controller.getById.bind(controller));
skillRoutes.post('/', controller.create.bind(controller));
skillRoutes.patch('/:id', controller.update.bind(controller));
skillRoutes.patch('/inactivate/:id', controller.inactivate.bind(controller));
skillRoutes.patch('/reactivate/:id', controller.reactivate.bind(controller));

export default skillRoutes;