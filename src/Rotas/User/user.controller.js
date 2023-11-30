import { Router } from "express";
import PostsService from '../Posts/posts.service.js'
import UserService from "./user.service.js";
import jwtGuard from "../../auth/guards/jwt.guard.js";

const userRouter = Router();
const postsService = new PostsService();
const userService = new UserService();

userRouter.get('/user', jwtGuard, async (req,res) => {
    const user = req.user;

    res.status(200).json(user);
})

userRouter.get('/user/:id/posts', jwtGuard, async (req,res) => {
    const userId = +req.params.id

    const user = req.user
    // autenticação a ser implementada

    const posts =  await postsService.getAllByUser(userId)

    console.log(posts)

    res.status(200).json(posts)


})


export default userRouter;