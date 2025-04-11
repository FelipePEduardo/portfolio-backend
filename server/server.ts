import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import routes from '@application/routes';

import { testConnection } from '@infra/data/DatabaseConnection';

const port = process.env.SERVER_PORT ?? 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(port, async () => {
  await testConnection();
  return console.log(`Server is running on port ${port}`);
});
