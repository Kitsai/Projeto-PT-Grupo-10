import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostsService {
    async getAll() {
        return await prisma.post.findMany();
    }

    async getAllByUser(authorId) {
        return await prisma.post.findMany({
            where: {
                authorId
            }
        });
    }

    async getOne(id) {
        return await prisma.post.findUnique({
            where: {
                id
            }
        });
    }

    async create(authorId, content) {
        return await prisma.post.create({
            data: {
                authorId,
                content
            }
        })
    }

    async delete(id) {
        return await prisma.post.delete({
            where: {
                id
            }
        }).catch(e => {
            if(e.code === 'P2025') {
                throw new Error('Post não existe')
            }
            throw e
        });
    }

    async update(id, content) {
        return await prisma.post.update({
            where: {
                id,
            },
            data: {
                content
            }
        }).catch(e => {
            if(e.code === 'P2025') {
                throw new Error('Post não existe')
            }
            throw e
        });
    }
    
    async getAllByUserId(userId) {
        return await prisma.post.findMany({
            where: {
                authorId: userId
            }
        });
    }

}

export default PostsService;