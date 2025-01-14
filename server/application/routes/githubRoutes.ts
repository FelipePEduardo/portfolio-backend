import { Router } from 'express';
import container from '@infra/IoC';

import { IGithubController } from '@interfaces/controllers';

const controller = container.get(IGithubController);
const githubRoutes = Router();

githubRoutes.get('/user', controller.getUserInformation.bind(controller));
githubRoutes.get('/repos', controller.getRepositories.bind(controller));

export default githubRoutes;
