import { Router } from "express";

import ComentsService from "./coments.service.js";
import PostsService from "../Posts/posts.service.js";
import UserService from "../User/user.service.js";

import jwtGuardNonBlocking from "../../auth/guards/jwt.guard.nonblocking.js";
import jwtGuard from "../../auth/guards/jwt.guard.js";

const comentsRouter = Router();

const postsService = new PostsService();
const userService = new UserService();
const commentService = new ComentsService();

comentsRouter.get('/posts/:postId/comment', jwtGuardNonBlocking, async (req, res) => {
    const logado = req.logado;
    const postId = +req.params.postId;
    
    let listaComments = await commentService.getAll(postId);
    res.status(200).json(listaComments);
})

comentsRouter.get('/comment/:id', jwtGuardNonBlocking, async (req, res) =>{
    const commentId = +req.params.id;

    const comment = await commentService.getOne(commentId);

    res.status(200).json(comment);
})


comentsRouter.post('/comment', jwtGuard, async (req,res) => {

    const content = req.body;
    console.log('body: ', content)
   try {
        const commentCriado = await commentService.create(content);
        res.status(201).json(commentCriado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

comentsRouter.delete('/comment/:id', jwtGuard, async (req, res) =>{
    const commentId = +req.params.id;
    const user = req.user;
    const comment = await commentService.getOne(commentId);

    if((user.admin === false) && (user.id !== comment.authorId)) return res.status(401).json({message: 'Usuário não autorizado'});

    try{
        const commentDeletado = await commentService.delete(commentId);
        res.status(200).json(commentDeletado);
    }catch (e){
        res.status(400).json({message: e.message})
    }
})

comentsRouter.put('/comment/:id', jwtGuard, async (req,res) => {
    const user = req.user;
    const { content } = req.body;
    const commentId = +req.params.id;
    const comment = await commentService.getOne(commentId);
    console.log(content)
    if(user.id !== comment.authorId) return res.status(401).json({message: 'Usuário não autorizado'});

    try {
        const commentAtualizado = await commentService.update(commentId, content);
        res.status(200).json(commentAtualizado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

export default comentsRouter;