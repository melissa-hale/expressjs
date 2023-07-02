import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  console.log(process.env)
  res.status(200).send({ status: 'ok' });
});

const api = express.Router();

api.get('/hello', (req, res) => {
  console.log(process.env)
  res.status(200).send({ message: 'hello world' });
});

api.get('/creds', (req, res) => {
  console.log(process.env)
  res.status(200).send({ message: {pg_user: process.env.PGUSER, pg_pass: process.env.PGPASS} });
});

// Version the api
app.use(`/${process.env.API_ROOT}/v1`, api);
