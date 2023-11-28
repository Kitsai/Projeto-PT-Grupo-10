import { Router } from "express";
import AuthService from "./auth.service.js";


const authRouter = Router();
const authService = new AuthService();

authRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.signIn(email, password);
        res.status(200).json(token);
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
})

authRouter.post('/signup', async (req, res) => {
    const {username, password, profile_picture, gender, email, jobTitle} = req.body;

    try {
        const newUser = await authService.signUp(username, password, profile_picture, gender, email, jobTitle)
        console.log(newUser);
        res.status(200).json(newUser);
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
})

export default authRouter;