const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/sku/:id', productController.producto);

router.get('/crear', productController.create);

//TARJETA TRELLO: CRUD 03 - Rutas EDIT (MV)
router.get("/sku/:id/editar", productController.editForm)

router.put("/sku/:id", productController.edit)

module.exports = router;