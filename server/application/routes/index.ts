import { Router } from 'express';

import userRoutes from './userRoutes';
import skillRoutes from './skillRoutes';
import authRoutes from './authRoutes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/skills', skillRoutes);

export default routes;
