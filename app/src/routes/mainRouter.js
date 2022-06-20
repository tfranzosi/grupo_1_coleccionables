//CONTROLLERS.
//Seguramente tengamos que dividir en userRouter y productRouter consumiendo sus respectivos controllers.

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.get('/', mainController.index);

router.get('/producto', mainController.producto);

router.get('/carrito', mainController.carrito);

router.get('/inicioSesion', mainController.login);

router.get('/registro', mainController.register);

router.get('/crear', mainController.create);

router.get('/editar', mainController.edit);


module.exports=router;