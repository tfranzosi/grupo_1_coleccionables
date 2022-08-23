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
        let pageNumber = 1;
        if (req.query.page !== undefined) pageNumber = parseInt(req.query.page);
        let itemsPerPage = 5;
        if (req.query.limit !== undefined) itemsPerPage = parseInt(req.query.limit);

        //Hago los pedidos a la Base de Datos
        const usersCount = await userQueries.searchCount('');
        const pageCount = Math.ceil(usersCount/itemsPerPage);
        const users = await userQueries.search('',itemsPerPage,pageNumber - 1);

        return res.render('users/userList',{
            users,
            pageCount,
            url: '/usuarios?'
        });
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
            res.render('users/userLogin', {
                usuario: req.session.usuario,
                errorInicioSesion : true});
        }
    },
    loginForm: (req, res) => {
        res.render('users/userLogin',{usuario: req.session.usuario,
            errorInicioSesion: false});
    },
    logout: (req, res) => {
        res.clearCookie("usuario");
        res.locals.isLogged = false;
        req.session.destroy();
        res.redirect('/');
    },

    carrito: (req, res) => {
        res.render('users/userShoppingCart');
    },

    register: async (req, res) => {
        let user = req.session.usuario;
        const interests = await userQueries.obtainInterests();
        console.log(interests);
        res.render('users/userRegister',{user,interests});
    },

    store: async (req, res) => {
        const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('users/userRegister', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}
        
        try{
            req.body.user_role_id=2;
            let user = userController.validateUser(req.body,req.file);
            await userQueries.create(user);
            res.cookie('usuario',req.body.user,{ maxAge: 1000*3600, httpOnly: true })
            res.redirect("/usuarios/perfil");
        } catch (e) {
            console.log('error: ',e);
            res.send(e); 
        }
	},

    profile: async (req, res) => {
        res.render('users/userProfile', { user: res.locals.userLogged });
    },

    detail: async (req, res) => {
        const user = await userQueries.findById(req.params.id);
        if(user !== null){
            res.render('users/userProfile' , { user });
        } else {
            res.render('error',{error: 'Tu usuario no aparece! ... Tu usuario no aparece! ...'})
        }
    },
    delete: async (req, res) => {
        userController.logout(req,res);
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

        return user;
    }

}

module.exports = userController;