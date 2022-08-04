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

// //VALIDATIONS REGISTRO

// const validations = [
// 	body('nombre').notEmpty().withMessage('Tenes que escribir un nombre'),
//     body('apellido').notEmpty().withMessage('Tenes que escribir un apellido'),
//     body('usuario').notEmpty().withMessage('Tenes que escribir un usuario'),
//     body('telefono_pais').notEmpty().withMessage('Tenes que escribir un código de país').bail().isNumeric().withMessage('Tenes que escribir un número'),
//     body('telefono').notEmpty().withMessage('Tenes que escribir un teléfono').bail().isNumeric().withMessage('Tenes que escribir un número'),
// 	body('email')
// 		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
// 		.isEmail().withMessage('Debes escribir un formato de correo válido'),
//     body('nacimiento').notEmpty().withMessage('Tenes que escribir una fecha').bail().isDate().withMessage('Tenes que escribir un formato de fecha'),
//     body('domicilio').notEmpty().withMessage('Tenes que escribir un domicilio'),
//     body('genero').notEmpty().withMessage('Tenes que seleccionar un género'),
//     body('intereses').notEmpty().withMessage('Tenes que seleccionar al menos un interés'),
// 	body('contrasenia').notEmpty().withMessage('Tienes que escribir una contraseña'),
//     body('condiciones').notEmpty().withMessage('Debes estar de acuerdo con los Términos y Condiciones'),
// 	body('urlImagen').custom((value, { req }) => {
// 		let file = req.file;
// 		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
// 		if (!file) {
// 			throw new Error('Tenes que subir una imagen');
// 		} else {
// 			let fileExtension = path.extname(file.originalname);
// 			if (!acceptedExtensions.includes(fileExtension)) {
// 				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
// 			}
// 		}

// 		return true;
// 	})
// ]

//FORMULARIO DE REGISTRO USUARIO
router.get('/registro',logueadoMW, userController.register);
router.post('/registro', upload.single('urlImagen'), registerMiddleware, userController.store);

//FORMULARIO DE LOGIN USUARIO
router.get('/inicioSesion',logueadoMW, userController.loginForm);
router.post('/inicioSesion', userController.login);

//PERFIL USUARIO
router.get('/perfil',invitadoMW, userController.profile);

//CERRAR SESION
router.get('/cerrarSesion', userController.logout);

router.get('/carrito', userController.carrito);




module.exports = router;