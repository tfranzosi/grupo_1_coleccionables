
// Middleware para la ruta /user/profile, detecta que no esta logueado asi que redirige a Login.
 
const invitadoMW = (req,res,next) => {
    if ( !req.session.usuario){
        res.redirect('/usuarios/inicioSesion');
    } else {
        next();
    }
}

module.exports=invitadoMW;