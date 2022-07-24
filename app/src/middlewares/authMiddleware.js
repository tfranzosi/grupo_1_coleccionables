const userController = require ("../controllers/userController")


function authMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let userLogged = userController.buscarUsuario(req.session.usuario);

    if(userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = userLogged;
    }
    
    
    next();
}

module.exports = authMiddleware