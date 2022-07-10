const fs = require('fs');
const path = require('path');
const rutaDB = path.join(__dirname,'../../public/db/usersdb.json');
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbParseada = JSON.parse(readDB);

userController={
    login: (req, res) => {
        res.render('users/login');
    },

    register: (req, res) => {
        res.render('users/register');
    },

    carrito: (req, res) => {
        res.render('users/productCart');
    },
    store: (req, res) => {
        let nuevoIdMaximo = userController.buscarMaximoId() + 1;
        console.log(nuevoIdMaximo);
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
        usuarioNuevo.contrasenia = req.body.contrasenia[0];


		dbParseada.push(usuarioNuevo)
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,3));

		res.redirect("/")
	},
    buscarMaximoId: () => {
        let maximo = 0;
        dbParseada.forEach(usuario => {
            if (usuario.id > maximo) maximo = usuario.id;
        });
        return maximo;
    }


}

module.exports = userController;