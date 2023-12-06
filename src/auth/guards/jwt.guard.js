import jwt from 'jsonwebtoken';

export default function jwtGuard(req,res,next) {
    const authorization = req.headers.authorization;

    if(!authorization) {
        return res.status(401).json({ error: 'Token não encontrado' });
    }

    const [bearer, token] = authorization.split(' ');

    if(bearer !== 'Bearer') {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, 'UltraSecretoUau');
        req.user = decoded
        next();
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
}