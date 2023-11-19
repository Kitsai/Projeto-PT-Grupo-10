import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostsService {
    async getAll() {
        return await prisma.posts.findMany();
    }

    async getAllByUser(authorId) {
        return await prisma.posts.findMany({
            where: {
                authorId
            }
        });
    }

    async getOne(id) {
        return await prisma.posts.findUnique({
            where: {
                id
            }
        });
    }

    async create(authorId, content) {
        return await prisma.posts.create({
            data: {
                authorId,
                content
            }
        });
    }

    async delete(id) {
        return await prisma.posts.delete({
            where: {
                id
            }
        });
    }
}

export default PostsService;