import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ComentsService {
    async getAll() {
        return await prisma.comen.findMany();
    }

    async getAllByUser(authorId) {
        return await prisma.comen.findMany({
            where: {
                authorId
            }
        });
    }

    async getOne(id) {
        return await prisma.comen.findUnique({
            where: {
                id
            }
        });
    }

    async create(authorId, content) {
        return await prisma.comen.create({
            data: {
                authorId,
                content
            }
        })
    }

    async delete(id) {
        return await prisma.comen.delete({
            where: {
                id
            }
        }).catch(e => {
            if(e.code === 'P2025') {
                throw new Error('Comentário não existe')
            }
            throw e
        });
    }

    async update(id, content) {
        return await prisma.comen.update({
            where: {
                id,
            },
            data: {
                content
            }
        }).catch(e => {
            if(e.code === 'P2025') {
                throw new Error('Comentário não existe')
            }
            throw e
        });
    }
}

export default ComentsService;