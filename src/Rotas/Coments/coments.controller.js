import { Router } from "express";

import ComentsService from "./coments.service.js";
import PostsService from "../Posts/posts.service.js";
import UserService from "../User/user.service.js";

import jwtGuardNonBlocking from "../../auth/guards/jwt.guard.nonblocking.js";
import jwtGuard from "../../auth/guards/jwt.guard.js";

const comentsRouter = Router();

const postsService = new PostsService();
const userService = new UserService();

comentsRouter.get("/coments", jwtGuardNonBlocking, async(req, res) =>{
    const logado = req.logado;

    let listaComents = await ComentsService.getAll();
    let newListaComents;

    if (logado) {
        newListaComents = await Promise.all(listaComents.map(async ({id, authorId, content, createdAt, updatedAt}) => {
            const author = await userService.findbyId(authorId);

            return {
                authorized: (req.user.id === authorId) || (req.user.admin === true),
                profilePicture: author.profile_picture,
                username: author.username,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        }));
    } else {
        newListaComents = await Promise.all(listaComents.map(async ({id, authorId, content, createdAt, updatedAt}) => {
            const author = await userService.findbyId(authorId);

            return {
                authorized: false,
                profilePicture: author.profile_picture,
                username: author.username,
                id,
                authorId,
                content,
                createdAt,
                updatedAt
            }
        }));
    }

    res.status(200).json(newListaComents);

})

comentsRouter.get('/coments/:id', jwtGuardNonBlocking, async (req, res) => {
    const user = req.user;
    const comentId = +req.params.id;

    const coment = await comentsService.getOne(comentId);
    const author = await userService.findbyId(coment.authorId);


    const newComent = {
        authorized: (logado)? (user.id === coment.authorId) || (user.admin === true) : false,
        profilePicture: author.profile_picture,
        name: author.username,
        id: coment.id,
        authorId: coment.authorId,
        content: coment.content,
        createdAt: coment.createdAt,
        updatedAt: coment.updatedAt,
    };
    if(coment) res.status(200).json(newComent);
    else res.status(404).json({message: 'Comentário não encontrado'});
});

comentsRouter.post('/coments', jwtGuard, async (req,res) => {

    const user = req.user;
    const content = req.body.content;

    try {
        const comentsCriado = await comentsService.create(user.id, content);
        res.status(201).json(comentsCriado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

comentsRouter.put('/coments/:id', jwtGuard, async (req,res) => {
    const user = req.user;
    const content = req.body.content;
    const comentId = +req.params.id;
    const coment = await comentsService.getOne(comentId);

    if(user.id !== coment.authorId) return res.status(401).json({message: 'Usuário não autorizado'});

    try {
        const comentsAtualizado = await comentsService.update(postId, content);
        res.status(200).json(comentAtualizado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }
});

comentsRouter.delete('/coments/:id', jwtGuard, async (req,res) => {

    const user = req.user;
    const comentId = +req.params.id;

    const coment = await comentsService.getOne(comentId);

    if((user.id !== coment.authorId) && (user.admin === false)) return res.status(401).json({message: 'Usuário não autorizado'});


    try {
        const comentDeletado = await comentsService.delete(comentId);
        res.status(200).json(comentDeletado);
    } catch (e) {
        res.status(400).json({message: e.message});
    }

});

export default comentsRouter;