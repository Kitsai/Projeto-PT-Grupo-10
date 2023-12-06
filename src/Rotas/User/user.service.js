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

    async editUserProfile(userId, newInfo) {
        try{
            const updatedUser = await prisma.user.update({
                where: {id: userId},
                data: newInfo
            });
            return updatedUser
        } catch (error) {
            throw new Error("Algo deu errado na edição")
        }
    }
}

export default UserService