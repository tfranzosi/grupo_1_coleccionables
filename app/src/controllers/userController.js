const fs = require('fs');
const path = require('path');
const userQueries = require('../database/userQueries');

const rutaDB = path.join(__dirname,'../../public/db/usersdb.json');
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbParseada = JSON.parse(readDB);
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');


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

    // viewOrders: async (req, res) => {
    //     let orders = await db.Order.findAll({
    //         where:{
    //             user_id: res.locals.userLogged.id,
    //             status_id: 1
    //         },
    //         include:
    //         { association: 'status_orders'}
    //     });

    //     res.render('users/userOrders',{ orders });
    // },

    shoppingCart: async (req, res) => {
        //Le pregunto a la tabla Orders, que orden tiene pendiente para el usuario logueado
        const {id} = await db.Order.findOne({
            where:{
                status_id: 1,
                user_id: res.locals.userLogged.id
            }
        })

        //Busco los productos en las tablas orders_details y products que estab en la orden pendiente
        const products = await db.OrderDetail.findAll({
            where: {
                order_id: id
            },
            include: { model: db.Product }
        });
        
        res.render('users/userShoppingCart',{ products });
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
        res.clearCookie("usuario");
        res.locals.isLogged = false;
        req.session.destroy();
        try{
            await userQueries.delete(req.params.id);
            res.redirect('/usuarios')
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('error' , { error: e });
        }
    },
    editForm: () =>{
        res.render("user")
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