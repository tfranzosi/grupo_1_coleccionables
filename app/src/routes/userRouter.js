const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const userZones = require('../middlewares/userZones');
const registerValidation = require('../middlewares/registerValidation');
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
router.get('/',userZones.adminOnly , userController.showAll);

//FORMULARIO DE REGISTRO USUARIO
router.get('/registro',userZones.invitedOnly, userController.register);
router.post('/registro', upload.single('urlImagen'), userZones.invitedOnly, registerValidation, userController.store);

//FORMULARIO DE LOGIN USUARIO
router.get('/inicioSesion', userZones.invitedOnly, userController.loginForm);
router.post('/inicioSesion', userZones.invitedOnly, userController.login);

//PERFIL USUARIO
router.get('/perfil', userZones.loggedOnly, userController.profile);

//CERRAR SESION
router.get('/cerrarSesion',userZones.loggedOnly, userController.logout);

//VER CARRITO COMPRAS
router.get('/carrito', userZones.loggedOnly, userController.shoppingCart);

//DETALLE DE USUARIO
router.get('/:id', userZones.loggedOnly, userController.detail)

//EDICION DE USUARIO
router.get("/:id/editar", userZones.loggedOnly, userController.editForm);
router.put("/:id", userZones.loggedOnly, upload.single('image_url'), userController.edit);

//BORRAR USUARIO
router.delete('/:id', userZones.loggedOnly, userController.delete);


module.exports = router;