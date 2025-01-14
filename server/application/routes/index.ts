import { Router } from 'express';

import userRoutes from './userRoutes';
import skillRoutes from './skillRoutes';
import authRoutes from './authRoutes';
import githubRoutes from './githubRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/skills', skillRoutes);
routes.use('/github', githubRoutes);

export default routes;
