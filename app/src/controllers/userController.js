const fs = require('fs');
const path = require('path');
const userQueries = require('../database/userQueries');

const rutaDB = path.join(__dirname,'../../public/db/usersdb.json');
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbParseada = JSON.parse(readDB);
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


userController={
    showAll: async (req,res) => {
        const [users] = await Promise.all([userQueries.findAll]);
        res.render('users/list',{users});

    },

    login: async (req, res) => {
        // Busco el usuario por id
        const [user] = await Promise.all([userQueries.findByUser(req.body.user)]);

        if (user !== null && bcrypt.compareSync(req.body.password,user.password)){
            req.session.usuario = user.user;
            if(req.body.rememberPassword){
                res.cookie("usuario",req.body.user,{ maxAge: 900000, httpOnly: true })
            }
            res.redirect('/');
        } else {
            res.render('users/login', {
                usuario: req.session.usuario,
                errorInicioSesion : true});
        }
    },
    loginForm: (req, res) => {
        res.render('users/login',{usuario: req.session.usuario,
            errorInicioSesion: false});
    },
    logout: (req, res) => {
        res.clearCookie("usuario");
        res.locals.isLogged = false;
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

    store: async (req, res) => {
        const resultValidation = validationResult(req);
		
		if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        try{
            let user = userController.validateProduct(req.body,req.file);
            await userQueries.create(user);
            res.redirect("/usuarios");
        } catch (e) {
            console.log('error: ',e);
            res.send(e);
        }
        /*
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
        */
        res.cookie('usuario',req.body.usuario,{ maxAge: 1000*3600, httpOnly: true })
		res.redirect("/")
	},

    profile: async (req, res) => {
        res.render('users/profile', { user: res.locals.userLogged });
    },

    profileExt: async (req, res) => {
        const [user] = await Promise.all([userQueries.findById(req.params.id)]);


        res.render('users/profile', { user })
    },
    delete: async (req, res) => {
        try{
            await Promise.all([UserQueries.delete(req.params.id)]);
            res.redirect('/usuarios')
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('error' , { error: e });
        }
    },

    edit: async (req,res) => {

        
    },

    
    /* METODOS ACCESORIOS*/

    buscarMaximoId: () => {
        let maximo = 0;
        dbParseada.forEach(usuario => {
            if (usuario.id > maximo) maximo = usuario.id;
        });
        return maximo;
    },

    buscarPorCampo: (campo,texto) => {
        let userBuscado = dbParseada.find( user => {  (user[campo] === texto);
            return userBuscado;
        })
    },
    validateProduct: (product, imageFile) => {
        //Veo si es oferta o no
        product.is_offer = false;
        if (product.discount > 0) product.is_offer = true;
        //Veo si es fisico o no
        product.is_physical = false;
        if (product.is_physical == 'true') product.is_physical = true;
        //Cambio la imagen a por defecto
        if(product.image_url === null) product.image_url = '/images/products/default.jpg';
        if (imageFile !== undefined) product.image_url = '/images/products/' + imageFile.filename;
     
        if(product.categories == null) product.categories=null;
        else if(product.categories.length <= 1) product.categories=[product.categories];

        product.visits_q = 0;
        product.sales_q = 0;
        product.best_seller = 0;

        return product
    }

}

module.exports = userController;