import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


class UserService {
    async create(username, password, profile_picture, gender, email, jobTitle) {
        return await prisma.user.create({
            data: {
                username,
                password,
                profile_picture,
                gender,
                email,
                jobTitle, //?
            }
        }).catch(e => {
            if(e.code === 'P2002') {
                throw new Error('Usuário já existe')
            }
            throw e
        })
    }

    async findbyEmail(email) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async findbyId(id) {
        return await prisma.user.findUnique({
            where: {
                id
            }
        })
    }
}

export default UserService