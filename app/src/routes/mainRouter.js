//CONTROLLERS.
//Seguramente tengamos que dividir en userRouter y productRouter consumiendo sus respectivos controllers.

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const productController = require('../controllers/productController');


router.get('/', mainController.index);
router.get("/search", productController.search);
router.get('/carritos', mainController.showCarts);

router.get('/error', mainController.error);

module.exports = router;