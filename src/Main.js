import express from 'express';
import authRouter from './auth/auth.controller.js';
import postsRouter from './Rotas/Posts/posts.controller.js';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(express.json());

app.use(authRouter);
app.use(postsRouter);

app.listen(3000, () => console.log('Server rodando na porta 3000'));
