import { Router } from "express";

import PostsService from "./posts.service.js";

import jwtGuardNonBlocking from "../../auth/guards/jwt.guard.nonblocking.js";
import jwtGuard from "../../auth/guards/jwt.guard.js";

const postsRouter = Router();

const postsService = new PostsService();

postsRouter.get('/posts', jwtGuardNonBlocking, async (req, res) => {
    const logado = req.logado;
    console.log(logado);

    let listaPosts = await postsService.getAll();

    if (logado) {
        listaPosts = listaPosts.map(({id, authorId, content, createdAt, updatedAt}) => {
            return {
                authorized: req.user.id === authorId,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        })
    } else {
        listaPosts = listaPosts.map(({id, authorId, content, createdAt, updatedAt}) => {
            return {
                authorized: false,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        })
    }

    res.status(200).json(listaPosts);
})

postsRouter.get('/posts/:id', jwtGuardNonBlocking,async (req,res) => undefined)

export default postsRouter;