import express from 'express';
import authRouter from './auth/auth.controller.js';

const app = express();

app.use(express.json());

app.use(authRouter);

app.listen(3000, () => console.log('Server rodando na porta 3000'));