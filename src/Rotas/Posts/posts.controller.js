import { Router } from "express";

import PostsService from "./posts.service.js";
import UserService from "../User/user.service.js";

import jwtGuardNonBlocking from "../../auth/guards/jwt.guard.nonblocking.js";
import jwtGuard from "../../auth/guards/jwt.guard.js";

const postsRouter = Router();

const postsService = new PostsService();
const userService = new UserService();

postsRouter.get('/posts', jwtGuardNonBlocking, async (req, res) => {
    const logado = req.logado;

    let listaPosts = await postsService.getAll();
    let newListaPosts;

    if (logado) {
        newListaPosts = await Promise.all(listaPosts.map(async ({id, authorId, content, createdAt, updatedAt}) => {
            const author = await userService.findbyId(authorId);

            return {
                authorized: (req.user.id === authorId) || (req.user.admin === true),
                profilePicture: author.profile_picture,
                username: author.username,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        }));
    } else {
        newListaPosts = await Promise.all(listaPosts.map(async ({id, authorId, content, createdAt, updatedAt}) => {
            const author = await userService.findbyId(authorId);

            return {
                authorized: false,
                profilePicture: author.profile_picture,
                username: author.username,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        }));
    }

    // console.log(newListaPosts);

    res.status(200).json(newListaPosts);
});

postsRouter.get('/posts/:id', jwtGuardNonBlocking, async (req, res) => {
    const user = req.user;
    const postId = +req.params.id;

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
});

// /user/:id/posts

postsRouter.post('/posts', jwtGuard, async (req,res) => {

    const user = req.user;
    const content = req.body.content;

    try {
        const postCriado = await postsService.create(user.id, content);
        res.status(201).json(postCriado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

postsRouter.put('/posts/:id', jwtGuard, async (req,res) => {
    const user = req.user;
    const content = req.body.content;
    const postId = +req.params.id;
    const post = await postsService.getOne(postId);

    if(user.id !== post.authorId) return res.status(401).json({message: 'Usuário não autorizado'});

    try {
        const postAtualizado = await postsService.update(postId, content);
        res.status(200).json(postAtualizado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

postsRouter.delete('/posts/:id', jwtGuard, async (req,res) => {

    const user = req.user;
    const postId = +req.params.id;

    const post = await postsService.getOne(postId);

    if((user.id !== post.authorId) && (user.admin === false)) return res.status(401).json({message: 'Usuário não autorizado'});


    try {
        const postDeletado = await postsService.delete(postId);
        res.status(200).json(postDeletado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }

});

export default postsRouter;