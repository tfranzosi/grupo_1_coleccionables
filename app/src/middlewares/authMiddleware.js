const userQueries = require('../database/userQueries');
const userController = require ("../controllers/userController")


async function authMiddleware(req, res, next) {
     res.locals.isLogged = false;
    
    if(req.cookies.usuario) {
        req.session.usuario = req.cookies.usuario;
    }

    let userLogged = undefined;
    if (req.session.usuario !== undefined)
    [ userLogged ] = await Promise.all([userQueries.findByUser(req.session.usuario)])
    
    if(userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = userLogged;

    }
    
    next();
}

module.exports = authMiddleware