import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import routes from '@application/routes';

const { SERVER_PORT } = process.env;

const app = express();

app.use(routes);

app.listen(SERVER_PORT, () =>
  console.log(`Server is running on port ${SERVER_PORT}`),
);
