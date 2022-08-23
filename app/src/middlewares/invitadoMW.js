
// Middleware para la ruta /user/profile, detecta que no esta logueado asi que redirige a Login.
 
const invitadoMW = (req,res,next) => {
    console.log('Pasa por aca ahora');
        if ( !req.session.usuario){
        res.redirect('/usuarios/inicioSesion');
    } else {
        console.log('Pasa por aca despues');
        next();
    }
}

module.exports=invitadoMW;