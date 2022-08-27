const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const userZones = require('../middlewares/userZones');
const validations = require('../middlewares/validations');
const products = require('../middlewares/products');


//MULTER REQUIRE

const storage = multer.diskStorage ({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: function(req, file, cb) {
        let filex = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null, filex);     
    }
})

const upload = multer({ storage});

//MOSTRAR TODOS LOS PRODUCTOS
router.get('/', productController.showAll);

//FORMULARIO PARA CREAR PRODUCTO
router.get('/crear', userZones.loggedOnly, productController.create);
router.post('/crear', userZones.loggedOnly, upload.single('image_url') , validations.product, productController.store); 

//DETALLE DE PRODUCTO
router.get('/:id', products.visted, productController.detail);

//FORMULARIO EDITAR PRODUCTO
router.get("/:id/editar", userZones.loggedOnly, productController.editForm)

//ENVIO INFORMACION PARA EDITAR Y GRABAR EN DB
router.put("/:id", userZones.loggedOnly, upload.single('image_url'), productController.edit)

//ELIMINAR ARTICULO
router.delete("/:id", userZones.loggedOnly, productController.delete)


module.exports = router;