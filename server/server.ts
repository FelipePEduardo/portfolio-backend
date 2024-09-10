import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import routes from '@application/routes';

import { testConnection } from '@infra/data/DatabaseConnection';

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(SERVER_PORT, async () => {
  await testConnection();
  return console.log(`Server is running on port ${SERVER_PORT}`);
});
