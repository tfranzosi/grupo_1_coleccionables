const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const queries = require('../database/queries/index');


userController={

    showAll: async (req,res) => {
        let pageNumber = 1;
        if (req.query.page !== undefined) pageNumber = parseInt(req.query.page);
        let itemsPerPage = 4;
        if (req.query.limit !== undefined) itemsPerPage = parseInt(req.query.limit);

        //Hago los pedidos a la Base de Datos
        const usersCount = await queries.User.searchCount('');
        const pageCount = Math.ceil(usersCount/itemsPerPage);
        const users = await queries.User.search('',itemsPerPage,pageNumber - 1);

        return res.render('users/userList',{
            users,
            pageCount,
            url: '/usuarios?'
        });
    },

    loginForm: (req, res) => {
        res.render('users/userLogin',{usuario: req.session.usuario,
            errorInicioSesion: false});
    },

    login: async (req, res) => {
        
        //Validación desde el middleware
        const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('users/userLogin', {
				errors: resultValidation.mapped(),
                usuario: req.session.usuario,
            errorInicioSesion: false
			});
		}

        // Busco el usuario por usuario o email
        const user = await queries.User.findByUser(req.body.user);
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


    logout: (req, res) => {
        res.clearCookie("usuario");
        res.locals.isLogged = false;
        req.session.destroy();
        res.redirect('/');
    },

    registerForm: async (req, res) => {
        let user = null;
        const interests = await queries.Interest.getAll()
        .catch(function(e){
            console.log('error: ',e);
            res.send(e); 
        });        
        
        const genders = await queries.User.getGenders()
        .catch(function(e){
            console.log('error: ',e);
            res.send(e); 
        });
            
        res.render('users/userRegister',{user,interests,genders});
    },

    store: async (req, res) => {
        
        const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
            
            const interests = await queries.Interest.getAll()
            .catch(function(e){
                console.log('error: ',e);
                res.send(e); 
            });

            const genders = await queries.User.getGenders()
            .catch(function(e){
                console.log('error: ',e);
                res.send(e); 
            });

            return res.render('users/userRegister', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                interests, genders
			});
		}
        
        try{
            req.body.user_role_id=2;

            let user = userController.validateUser(req.body,req.file);
            let newUser = await queries.User.create(user);
            newUser.interests = [...user.interests];
            await queries.UserInterest.create(newUser);

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
        const user = await queries.User.findById(req.params.id);
        if(user !== null){
            res.render('users/userProfile' , { user });
        } else {
            res.render('error',{error: 'Tu usuario no aparece! ... Tu usuario no aparece! ...'})
        }
    },

    
    editForm: async (req,res) =>{
        try{
            const user = await queries.User.findById(req.params.id);
            user.interests = await queries.UserInterest.getUserInterestsById(user.id);
            const interests = await queries.Interest.getAll();
            
            if(req.session.usuario === user.user){
                res.render("users/userEdit",{user,interests});
            } else {
                res.render("error",{error:"¡¡ No podes editar un usuario que no sea tuyo !!"})
            }
        }catch (e){
            console.log('error: ', e);
            res.send(e)
        }
    },

    edit: async (req,res) => {
        const interests = await queries.Interest.getAll()
            .catch(function(e){
                console.log('error: ',e);
                res.send(e); 
            });
        const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
            return res.render('users/userEdit', {
                errors: resultValidation.mapped(),
				user: req.body,
                interests
			});
		}
        
        try{
            let user = userController.validateUser(JSON.parse(JSON.stringify(req.body)),req.file)
            user.id = req.params.id;
            await queries.UserInterest.delete(user.id);
            await queries.UserInterest.create(user);
            await queries.User.update(user);
            
            if(user.user != req.session.usuario){
                res.clearCookie('usuario');
                res.cookie('usuario',req.body.user,{ maxAge: 1000*3600, httpOnly: true })
            }
            res.redirect("/usuarios/perfil");
        } catch (e) {
            console.log('error: ', e);
            res.send(e);
        }     
    },

    delete: async (req, res) => {
        try{
            await queries.User.delete(req.params.id);
            if ( res.locals.userLogged.id === parseInt(req.params.id) ){
                res.clearCookie("usuario");
                res.locals.isLogged = false;
                req.session.destroy();
                res.redirect('/');
            }
            else res.redirect('/usuarios');
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('error' , { error: e });
        }
    },
    
    /* METODOS ACCESORIOS*/
    validateUser: (user, imageFile) => {
        //Cambio la imagen a por defecto
        if(user.image_url === undefined ) user.image_url = '/images/users/default.jpeg';
        if (imageFile !== undefined) user.image_url = '/images/users/' + imageFile.filename;

        user.password = bcrypt.hashSync(user.password,10);

        return user;
    }

}

module.exports = userController;