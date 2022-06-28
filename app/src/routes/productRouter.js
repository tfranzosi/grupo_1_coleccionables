const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

//MOSTRAR TODOS LOS PRODUCTOS
router.get('/', productController.showAll);

//FORMULARIO PARA CREAR PRODUCTO
router.get('/crear', productController.create);

//DETALLE DE 1 PRODUCTO
router.get('/:id', productController.producto);

//FORMULARIO EDITAR 1 PRODUCTO
router.get("/:id/editar", productController.editForm)

//ENVIO INFORMACION PARA EDITAR Y GRABAR EN DB
router.put("/:id", productController.edit)

//ELIMINAR 1 ARTICULO
router.delete("/:id", productController.delete)


module.exports = router;