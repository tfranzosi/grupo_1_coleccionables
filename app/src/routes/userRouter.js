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
router.post('/registro', upload.single('urlImagen'), registerMiddleware, userController.store);

//FORMULARIO DE LOGIN USUARIO
router.get('/inicioSesion',logueadoMW, userController.loginForm);
router.post('/inicioSesion', userController.login);

//PERFIL USUARIO
router.get('/perfil', invitadoMW, userController.profile);

//CERRAR SESION
router.get('/cerrarSesion', userController.logout);

//VER CARRITO COMPRAS
router.get('/carrito', invitadoMW, userController.shoppingCart);

//DETALLE DE USUARIO
router.get('/:id', userController.detail)

//DETALLE DE USUARIO EDITABLE
router.get("/:id/editar",userController.editForm);

//ENVIO INFORMACION PARA EDITAR Y GRABAR EN DB
router.put("/:id", upload.single('image_url'), userController.edit);

//BORRAR USUARIO
router.delete('/:id', userController.delete);


module.exports = router;