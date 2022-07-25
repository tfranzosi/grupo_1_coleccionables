const fs = require('fs');
const path = require('path');
const rutaDB = path.join(__dirname,'../../public/db/usersdb.json');
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbParseada = JSON.parse(readDB);
const bcrypt = require('bcryptjs');


userController={
    login: (req, res) => {
        let usuario = userController.buscarUsuario(req.body.usuario);
        if (usuario !== undefined && bcrypt.compareSync(req.body.contrasenia,usuario.contrasenia)){
            req.session.usuario = req.body.usuario;
            if(req.body.rememberPassword){
                res.cookie("usuario",req.body.usuario,{ maxAge: 900000, httpOnly: true })
            }
            res.redirect('/');
        } else {
            res.render('users/login', {usuario: req.session.usuario,
                errorInicioSesion : true});
        }
    },
    loginForm: (req, res) => {
        res.render('users/login',{usuario: req.session.usuario,
            errorInicioSesion: false});
    },
    logout: (req, res) => {
        res.clearCookie("usuario");
        req.session.destroy();
        res.redirect('/');
    },

    register: (req, res) => {
        let usuario = req.session.usuario;
        res.render('users/register',{usuario});
    },


    carrito: (req, res) => {
        res.render('users/productCart');
    },

    store: (req, res) => {
        let nuevoIdMaximo = userController.buscarMaximoId() + 1;
        let urlImagenNueva = '/images/users/default.jpg';
        if (req.file !== undefined) urlImagenNueva = '/images/users/' + req.file.filename;

        //Defino usuario vacio segun mi base de datos
        let usuarioNuevo = {};
        for (let key in dbParseada[0]){
            if (req.body[key] !== undefined){
                if ( isNaN(req.body[key]) ) usuarioNuevo[key] = req.body[key];
                else usuarioNuevo[key] = parseInt(req.body[key]);
            }
            else usuarioNuevo[key] = "";
        }
        usuarioNuevo.id = nuevoIdMaximo;
        usuarioNuevo.urlImagen = urlImagenNueva;
        usuarioNuevo.contrasenia = bcrypt.hashSync(req.body.contrasenia[0],10);
        for (let int in usuarioNuevo.intereses){
            switch (usuarioNuevo.intereses[int]){
                case "a":
                    usuarioNuevo.intereses[int] = "Anime";
                    break;
                case "b":
                    usuarioNuevo.intereses[int] = "Acción";
                    break;
                case "c":
                    usuarioNuevo.intereses[int] = "Deporte";
                    break;
                case "d":
                    usuarioNuevo.intereses[int] = "RPG";
                    break;
                case "e":
                    usuarioNuevo.intereses[int] = "Social";
                    break;
            }
        }

		dbParseada.push(usuarioNuevo)
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,3));
        res.cookie('usuario',req.body.usuario,{ maxAge: 1000*3600, httpOnly: true })
		res.redirect("/")
	},

    profile: (req, res) => {
        res.render('users/profile');
    },

    /* METODOS ACCESORIOS*/

    buscarMaximoId: () => {
        let maximo = 0;
        dbParseada.forEach(usuario => {
            if (usuario.id > maximo) maximo = usuario.id;
        });
        return maximo;
    },

    buscarUsuario: (usuario) => {
        let usuarioSeleccionado = dbParseada.find( elemento => {
            return elemento.usuario === usuario;
        });
        if (usuarioSeleccionado === undefined ) return undefined;
        else return usuarioSeleccionado;
    },

    buscarPorCampo: (campo,texto) => {
        let userBuscado = dbParseada.find( user => {  (user[campo] === texto);
            return userBuscado;
        })
    }

}

module.exports = userController;