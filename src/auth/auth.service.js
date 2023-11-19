import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserService from '../Rotas/User/user.service.js';

const userService = new UserService();

class AuthService {
    async signIn (email, senha) {
        const user = await userService.findbyEmail(email);

        if(!user) {
            throw new Error('Usuário não encontrado');
        }

        if(!await bcrypt.compare(senha, user.password)) {
            throw new Error('Senha incorreta');
        }

        const token = jwt.sign({ id: user.id }, "UltraSecretoUau")

        return {token};
    }

    async signUp (username, email, nome, password, gender, cargo) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        password = await bcrypt.hash(password, salt);

        return await userService.create(username, email, hashedPassword,nome, gender, cargo);
    }
}

export default AuthService;