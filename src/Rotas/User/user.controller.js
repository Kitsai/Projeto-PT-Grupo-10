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

    res.status(200).json(posts)
})

userRouter.put('/user/edit-profile', jwtGuard, async (req, res) => {
    const { username, email, password, gender, jobTitle, profile_picture } = req.body;

    try {
        const userId = req.user.id;
        const updatedUser = await userService.editUserProfile(userId, {
            username,
            email,
            password,
            gender,
            jobTitle,
            profile_picture,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro na edição do perfil', error);
        res.status(500).json({ error: 'Erro na edição do perfil' });
    }
});


export default userRouter;