const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');
const productValidation = require('../middlewares/productValidation');


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
router.get('/crear', productController.create);
router.post('/crear', upload.single('image_url') , /*productValidation,*/ productController.store); 

//DETALLE DE 1 PRODUCTO
router.get('/:id', productController.detail);

//FORMULARIO EDITAR 1 PRODUCTO
router.get("/:id/editar", productController.editForm)

//ENVIO INFORMACION PARA EDITAR Y GRABAR EN DB
router.put("/:id", upload.single('image_url'), productController.edit)

//ELIMINAR 1 ARTICULO
router.delete("/:id", productController.delete)


module.exports = router;