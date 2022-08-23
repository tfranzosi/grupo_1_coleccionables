const { body } = require('express-validator');

//VALIDATIONS REGISTRO

const registerValidations = [
	body('first_name').notEmpty().withMessage('Tenes que escribir un nombre'),
    body('last_name').notEmpty().withMessage('Tenes que escribir un apellido'),
    body('user').notEmpty().withMessage('Tenes que escribir un usuario'),
    body('phone_country').notEmpty().withMessage('Tenes que escribir un código de país').bail()
						 .isNumeric().withMessage('Tenes que escribir un número'),
    body('phone_number').notEmpty().withMessage('Tenes que escribir un teléfono').bail()
						.isNumeric().withMessage('Tenes que escribir un número'),
	body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
				 .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('birth_date').notEmpty().withMessage('Tenes que escribir una fecha').bail()
					  .isDate().withMessage('Tenes que escribir un formato de fecha'),
    body('address').notEmpty().withMessage('Tenes que escribir un domicilio'),
    body('gender').notEmpty().withMessage('Tenes que seleccionar un género'),
    body('interests').notEmpty().withMessage('Tenes que seleccionar al menos un interés'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('password2').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
					 .custom((value, { req }) => body('password2') === body('password')).withMessage("Las contraseñas deben coincidir"),
	body('conditions').notEmpty().withMessage('Debes estar de acuerdo con los Términos y Condiciones'),
	body('image_url').custom((value, { req }) => {
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