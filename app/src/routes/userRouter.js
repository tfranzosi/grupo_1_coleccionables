const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const logueadoMW = require('../middlewares/logueadoMW');
const invitadoMW = require('../middlewares/invitadoMW');
const registerMiddleware = require('../middlewares/registerMiddleware');
const { Router } = require('express');


//MULTER REQUIRE

const storage = multer.diskStorage ({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function(req, file, cb) {
        let filex = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filex);     
    }
})

const upload = multer({ storage : storage});

//LISTAR USUARIOS
router.get('/', userController.showAll);

//FORMULARIO DE REGISTRO USUARIO
router.get('/registro',logueadoMW, userController.register);
router.post('/registro', upload.single('urlImagen'), logueadoMW, registerMiddleware, userController.store);

//FORMULARIO DE LOGIN USUARIO
router.get('/inicioSesion', logueadoMW, userController.loginForm);
router.post('/inicioSesion', logueadoMW, userController.login);

//PERFIL USUARIO
router.get('/perfil', invitadoMW, userController.profile);

//CERRAR SESION
router.get('/cerrarSesion',invitadoMW, userController.logout);

//VER CARRITO COMPRAS
router.get('/carrito', invitadoMW, userController.shoppingCart);

//DETALLE DE USUARIO
router.get('/:id', userController.detail)

//EDICION DE USUARIO
router.get("/:id/editar", invitadoMW, userController.editForm);
router.put("/:id", invitadoMW, upload.single('image_url'), userController.edit);

//BORRAR USUARIO
router.delete('/:id', invitadoMW, userController.delete);


module.exports = router;