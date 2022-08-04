const { body } = require('express-validator');

//VALIDATIONS REGISTRO

const registerValidations = [
	body('nombre').notEmpty().withMessage('Tenes que escribir un nombre'),
    body('apellido').notEmpty().withMessage('Tenes que escribir un apellido'),
    body('usuario').notEmpty().withMessage('Tenes que escribir un usuario'),
    body('telefono_pais').notEmpty().withMessage('Tenes que escribir un código de país').bail().isNumeric().withMessage('Tenes que escribir un número'),
    body('telefono').notEmpty().withMessage('Tenes que escribir un teléfono').bail().isNumeric().withMessage('Tenes que escribir un número'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('nacimiento').notEmpty().withMessage('Tenes que escribir una fecha').bail().isDate().withMessage('Tenes que escribir un formato de fecha'),
    body('domicilio').notEmpty().withMessage('Tenes que escribir un domicilio'),
    body('genero').notEmpty().withMessage('Tenes que seleccionar un género'),
    body('intereses').notEmpty().withMessage('Tenes que seleccionar al menos un interés'),
	body('contrasenia').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('condiciones').notEmpty().withMessage('Debes estar de acuerdo con los Términos y Condiciones'),
	body('urlImagen').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif'];
		
		if (!file) {
			throw new Error('Tenes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]

module.exports = registerValidations;