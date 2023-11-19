import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserService from '../Rotas/User/user.service.js';

const userService = new UserService();

class AuthService {
    async signin (email, password) {
        const user = await userService.findbyEmail(email);

        if(!user) {
            throw new Error('Usuário não encontrado');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Credenciais inválidas');
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new Error('Senha incorreta');
        }

        const token = jwt.sign({ id: user.id }, "UltraSecretoUau")

        return 'Token de autenticação: ' +  {token} ;
    }

    async signup (username, email, nome, password, gender, cargo) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, 10);
        password = await bcrypt.hash(password, salt);

        return await userService.create(username, email, hashedPassword ,nome, gender, cargo);
    }

    async findByEmailAndPassword(email, password) {
        return await prisma.user.findUnique({
            where: {
                email,
                password,
            },
        });
    }

    async create(username, email, password, nome, gender, cargo) {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        return await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                nome,
                gender,
                cargo,
            }
        });
    }
    
}

export default AuthService;