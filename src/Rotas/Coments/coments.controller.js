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

comentsRouter.get('/posts/:postId/comments', jwtGuardNonBlocking, async (req, res) => {
    const logado = req.logado;
    const postId = +req.params.postId;
    
    let listaComments = await commentService.getAll(postId);
    res.status(200).json(listaComments);
})

comentsRouter.get('/comment/:id', jwtGuardNonBlocking, async (req, res) => {
    const user = req.user;
    const postId = +req.params.postId;
    const commentId = +req.params.id;

    const post = await postsService.getOne(postId);
    const author = await userService.findbyId(post.authorId);


    const newPost = {
        authorized: (logado)? (user.id === post.authorId) || (user.admin === true) : false,
        profilePicture: author.profile_picture,
        name: author.username,
        id: post.id,
        authorId: post.authorId,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
    };
    if(post) res.status(200).json(newPost);
    else res.status(404).json({message: 'Post não encontrado'});
})


comentsRouter.post('/posts/:postId/comment', jwtGuard, async (req,res) => {

    const user = req.user;
    const content = req.body.content;

    try {
        const commentCriado = await commentService.create(user.id, content);
        res.status(201).json(commentCriado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

comentsRouter.delete('/comment/:id', jwtGuard, async (req, res) =>{
    const commentId = +req.params.commentId;
    const user = req.user;
    const postId = +req.params.postId;
    if((user.admin === false) && (user.id !== postsService.getOne(postId))) return res.status(401).json({message: 'Usuário não autorizado'});

    try{
        const commentDeletado = await commentService.delete(commentId);
        res.status(200).json(commentDeletado);
    }catch (e){
        res.status(400).json({message: e.message})
    }
})

comentsRouter.put('/comment/:id', jwtGuard, async (req,res) => {
    const user = req.user;
    const content = req.body.content;
    const postId = +req.params.postId;
    const post = await postsService.getOne(postId);

    if(user.id !== post.authorId) return res.status(401).json({message: 'Usuário não autorizado'});

    try {
        const commentAtualizado = await commentServicee.update(postId, content);
        res.status(200).json(commentAtualizado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

export default comentsRouter;