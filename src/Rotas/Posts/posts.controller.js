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
    console.log(logado);

    let listaPosts = await postsService.getAll();
    let newListaPosts;

    if (logado) {
        newListaPosts = await Promise.all(listaPosts.map(async ({id, authorId, content, createdAt, updatedAt}) => {
            const author = await userService.findbyId(authorId);

            return {
                authorized: (req.user.id === authorId) || (req.user.admin === false),
                profilePicture: author.profile_picture,
                username: author.username,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        }))
    } else {
        newListaPosts = await Promise.all(listaPosts.map(async ({id, authorId, content, createdAt, updatedAt}) => {
            const author = await userService.findbyId(authorId);

            return {
                authorized: false,
                profilePicture: author.profile_picture,
                name: author.username,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        }))
    }

    // console.log(newListaPosts);

    res.status(200).json(newListaPosts);
})

postsRouter.get('/posts/:authorId', jwtGuardNonBlocking ,async (req,res) => undefined)


postsRouter.post('/post', jwtGuard, async (req,res) => undefined)

postsRouter.put('/post/:id', jwtGuard, async (req,res) => undefined)

postsRouter.delete('/post/:id', jwtGuard, async (req,res) => {

})

export default postsRouter;