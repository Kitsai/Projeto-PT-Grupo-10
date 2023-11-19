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
        });
    }

    async delete(id) {
        return await prisma.post.delete({
            where: {
                id
            }
        });
    }
}

export default PostsService;