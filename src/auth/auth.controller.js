import { Router } from "express";
import AuthService from "./auth.service.js";
import UserService from "../Rotas/User/user.service.js";

const authRouter = Router();
const authService = new AuthService();
const userService = new UserService();

authRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.signIn(email, password);
        res.status(200).json({ token });
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
});

authRouter.post('/signup', async (req, res) => {
    const {username, email, nome, password, gender, cargo} = req.body;

    try {
        //cria o usuario
        const novoUsuario = await authService.signUp(username, email, nome, password, gender, cargo)
        res.status(200).json(novoUsuario);
    } catch (e) {
        //mensagem de erro
        res.status(401).json({ error: e.message });
    }
});


export default authRouter;