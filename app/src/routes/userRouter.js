const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

//MULTER REQUIRE

const storage = multer.diskStorage ({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/users'));
    },
    filename: function(req, file, cb) {
        console.log(file);
        let filex = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        console.log(filex);
        cb(null, filex);     
    }
})

const upload = multer({ storage : storage});


//FORMULARIO DE REGISTRO USUARIO
router.get('/registro', userController.register);
router.post('/registro', upload.single('urlImagen'), userController.store);

//FORMULARIO DE LOGIN USUARIO
router.get('/inicioSesion', userController.login);
router.post('/inicioSesion', userController.userAuth);

//CERRAR SESION
router.get('/cerrarSesion', userController.logout);

router.get('/carrito', userController.carrito);




module.exports = router;