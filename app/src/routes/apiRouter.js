const express = require('express');
const router = express.Router();
const apiProductController = require('../controllers/api/productController');

//MOSTRAR TODOS LOS PRODUCTOS - API
router.get('/products', apiProductController.list);

module.exports = router;