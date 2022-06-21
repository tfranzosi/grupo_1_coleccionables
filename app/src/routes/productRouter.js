const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/sku/:id', productController.producto);

router.get('/crear', productController.create);

router.get('/sku/:id/editar', productController.edit);


module.exports = router;