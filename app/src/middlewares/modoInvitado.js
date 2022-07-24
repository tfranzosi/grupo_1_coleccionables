/*
Si bien en la view se elimina la posibilidad de clickear "registrar" cuando esta logueado,
es prudente eliminar el acceso a un usuario logueado que ingrese con la url directo a '/user/register'
*/

const invitado = (req, res, next) => {
    //req.session.usuario fue creado en userControllers.login
    if (req.session.usuario){
        res.redirect('/'); //CAMBIAR A /USER/PROFILE cuando este creado
    }
    next();
}

module.exports = invitado;