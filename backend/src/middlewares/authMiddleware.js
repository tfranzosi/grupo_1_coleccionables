const queries = require('../database/queries/index');

async function authMiddleware(req, res, next) {
     res.locals.isLogged = false;
    
    if(req.cookies.usuario) {
        req.session.usuario = req.cookies.usuario;
    }

    let userLogged = undefined;
    if (req.session.usuario !== undefined)
    userLogged = await queries.User.findByUser(req.session.usuario);
    
    if(userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = userLogged;

    }
    
    next();
}

module.exports = authMiddleware