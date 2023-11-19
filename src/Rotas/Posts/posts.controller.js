import { Router } from "express";

import PostsService from "./posts.service.js";

import jwtGuardNonBlocking from "../../auth/guards/jwt.guard.nonblocking.js";
import jwtGuard from "../../auth/guards/jwt.guard.js";

const postsRouter = Router();

const postsService = new PostsService();

postsRouter.get('/posts', jwtGuardNonBlocking, async (req, res) => {
    const logado = req.logado;

    let listaPosts = await postsService.getAll();

    if (logado) {
        listaPosts.map(post => {
            {
                authorized: req.user.id === post.authorId,
                post
            }
        })
    } else {
        listaPosts.map(post => {
            {
                authorized: false,
                post
            }
        })
    }

    res.status(200).json(listaPosts);
})

postsRouter.get('/posts/:id', jwtGuardNonBlocking,async (req,res) => {undefined})