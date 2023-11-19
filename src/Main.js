import express from 'express';
// import cookieParser from 'cookie-parser';
import authRouter from './auth/auth.controller.js';
import postsRouter from './Rotas/Posts/posts.controller.js';

const app = express();

app.use(express.json());
// app.use(cookieParser());

app.use(authRouter);
app.use(postsRouter);

app.listen(3000, () => console.log('Server rodando na porta 3000'));