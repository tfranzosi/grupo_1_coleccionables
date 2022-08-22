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
        const users = await userQueries.findAll();
        return res.render('users/list',{users});
    },

    login: async (req, res) => {
        // Busco el usuario por usuario o email
        const user = await userQueries.findByUser(req.body.user);
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
            let user = userController.validateUser(req.body,req.file);
            await userQueries.create(user);
            res.redirect("/usuarios");
        } catch (e) {
            console.log('error: ',e);
            res.send(e);
        }

        res.cookie('usuario',req.body.usuario,{ maxAge: 1000*3600, httpOnly: true })
		res.redirect("/")
	},

    profile: async (req, res) => {
        res.render('users/profile', { user: res.locals.userLogged });
    },

    detail: async (req, res) => {
        const user = await userQueries.findById(req.params.id);
        if(user !== null){
            res.render('users/profile' , { user });
        } else {
            res.render('error',{error: 'Tu usuario no aparece! ... Tu usuario no aparece! ...'})
        }
    },
    delete: async (req, res) => {
        try{
            await userQueries.delete(req.params.id);
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
    validateUser: (user, imageFile) => {
        //Cambio la imagen a por defecto
        if(user.image_url === null) user.image_url = '/images/users/default.jpg';
        if (imageFile !== undefined) user.image_url = '/images/users/' + imageFile.filename;

        return product
    }

}

module.exports = userController;