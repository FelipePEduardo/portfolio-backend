import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from '@application/routes';

import { testConnection } from '@infra/data/DatabaseConnection';
import { errorHandler } from '@application/helpers/errorHandler';

const port = process.env.SERVER_PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(routes);
app.use(errorHandler);

app.listen(port, async () => {
  await testConnection();
  console.log(`Server is running on port ${port}`);
});
