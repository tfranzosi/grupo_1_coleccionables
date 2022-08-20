const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');
const logueadoMW = require('../middlewares/logueadoMW');
const invitadoMW = require('../middlewares/invitadoMW');
const registerMiddleware = require('../middlewares/registerMiddleware');


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
router.get('/registro',logueadoMW, userController.register);
router.post('/registro', upload.single('urlImagen'), registerMiddleware, userController.store);

//FORMULARIO DE LOGIN USUARIO
router.get('/inicioSesion',logueadoMW, userController.loginForm);
router.post('/inicioSesion', userController.login);

//PERFIL USUARIO
router.get('/perfil',invitadoMW, userController.profile);
// router.get('/perfil/:id',userController.profile);


//CERRAR SESION
router.get('/cerrarSesion', userController.logout);

router.get('/carrito', userController.carrito);




module.exports = router;