import jwt from 'jsonwebtoken';

export default function jwtGuarNonBlocking(req,res,next) {
    const authorization = req.headers.authorization;

    if(!authorization) {
        req.logado = false;
        next();
        return;
    }

    const [bearer, token] = authorization.split(' ');

    if(bearer !== 'Bearer') {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, 'UltraSecretoUau');
        req.user = decoded
        req.logado = true;
        next();
    } catch (e) {
        res.status(401).json({ error: e.message });
    }
}