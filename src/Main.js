import express from 'express';
import cors from 'cors';
import authRouter from './auth/auth.controller.js';
import postsRouter from './Rotas/Posts/posts.controller.js';
import userRouter from './Rotas/User/user.controller.js';
import commentsRouter from './Rotas/Coments/coments.controller.js'

const app = express();

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
// app.use(cookieParser());

app.use(authRouter);
app.use(postsRouter);
app.use(userRouter);
app.use(commentsRouter);

 app.get('/teste', (req, res) =>{
    res.send('funcionou')
 })


app.listen(3000, () => console.log('Server rodando na porta 3000'));