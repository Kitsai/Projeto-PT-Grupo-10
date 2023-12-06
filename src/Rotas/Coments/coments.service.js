import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ComentsService {
    async getAll(postId){
        return await prisma.comment.findMany({
            where:{
                postId
            },
            include:{
                author:{
                    select:{
                        profile_picture:true,
                        username:true
                    }
                }
            }
        });
    }

    async getOne(id){
        return await prisma.comment.findUnique({
            where:{
                id
            },
            include:{
                author:{
                    select:{
                        profile_picture:true,
                        username:true
                    }
                }
            }

        })
    }

    async create(data) {
        
        return await prisma.comment.create({
            data
        })
    }

    async delete(id) {
        return await prisma.comment.delete({
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
        console.log(content)
        return await prisma.comment.update({
            where: {
                id
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