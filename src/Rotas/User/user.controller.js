import { Router } from "express";

import UserService from "./user.service.js";

import jwtGuard from "../../auth/guards/jwt.guard.js";

const userRouter = Router();

const userService = new UserService();

userRouter.get('/user', jwtGuard, async (req,res) => {
    const user = req.user;

    res.status(200).json(user);
})

export default userRouter;