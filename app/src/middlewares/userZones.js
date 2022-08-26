module.exports = {

    invitedOnly: (req, res, next) => {
        if (req.session.usuario) res.redirect('/'); 
        else next();
    },

    loggedOnly: (req,res,next) => {
        if ( !req.session.usuario) res.redirect('/usuarios/inicioSesion');
        else next();
    },

    adminOnly: (req, res, next) => {
        if ( !req.session.usuario) res.redirect('/usuarios/inicioSesion');
        else if (res.locals.userLogged.roles.name === 'admin')  next();
        else res.render('error',{error: 'Sector unicamente para administradores'});
    }

}