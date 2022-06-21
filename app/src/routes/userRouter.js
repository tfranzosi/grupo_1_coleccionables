const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/carrito', userController.carrito);

router.get('/inicioSesion', userController.login);

router.get('/registro', userController.register);


module.exports = router;