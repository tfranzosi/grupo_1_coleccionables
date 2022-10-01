const express = require('express');
const router = express.Router();
const apiProductController = require('../controllers/api/productController');
const apiUserController = require('../controllers/api/userController');

//MOSTRAR TODOS LOS PRODUCTOS - API
router.get('/products', apiProductController.list);

//MOSTRAR ULTIMO PRODUCTO
router.get('/products/last', apiProductController.lastProduct);

//MOSTRAR DETALLE DE PRODUCTO - API
router.get('/products/:id', apiProductController.detail);

//MOSTRAR TODOS LOS USUARIOS - API
router.get('/users', apiUserController.list);

//AUTENTIFICAR USUARIO
router.post('/users/auth', apiUserController.auth);

//MOSTRAR ULTIMO USUARIO
router.get('/users/last', apiUserController.lastUser);

//MOSTRAR DETALLE DE USUARIOS - API
router.get('/users/:id', apiUserController.detail);

//BORRAR PRODUCTO
router.delete('/products/:id',apiProductController.delete);


module.exports = router;