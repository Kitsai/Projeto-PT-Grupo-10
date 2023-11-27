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

        const token = jwt.sign(user, "UltraSecretoUau")

        return {token};
    }

    async signUp (username, password, profile_picture, gender, email, jobTitle) {
        const salt = await bcrypt.genSalt();

        password = await bcrypt.hash(password, salt);

        return await userService.create(username,password,profile_picture,gender,email,jobTitle);
    }
}

export default AuthService;