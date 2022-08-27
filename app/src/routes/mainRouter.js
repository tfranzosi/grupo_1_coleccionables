//CONTROLLERS.
//Seguramente tengamos que dividir en userRouter y productRouter consumiendo sus respectivos controllers.

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');


router.get('/', mainController.index);
router.get("/search", productController.search);
router.get('/carritos', userController.viewOrders);

router.get('/error', mainController.error);

module.exports = router;