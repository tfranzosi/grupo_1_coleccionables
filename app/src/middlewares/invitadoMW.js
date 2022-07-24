
// Middleware para la ruta /user/profile, detecta que no esta logueado asi que redirige a Login.
 
const invitadoMW = (req,res,next) => {
    if (!req.session.usuario){
        res.redirect('/inicioSesion');
    }
    next();
}

module.exports=invitadoMW;