const { body } = require('express-validator');

//VALIDATIONS REGISTRO

const productValidations = [
	body('sku').notEmpty().withMessage('Tenes que escribir un sku'),
    body('titulo').notEmpty().withMessage('Tenes que escribir un titulo'),
    body('descripcionCorta').notEmpty().withMessage('Tenes que escribir una descripcion corta del producto'),
    body('descripcionLarga').notEmpty().withMessage('Tenes que escribir una descripcion larga del producto'),
    body('precioRegular').notEmpty().withMessage('Tenes que escribir un precio').bail().isNumeric().withMessage('Tenes que escribir un número'),
	body('descuento').notEmpty().withMessage('Tenes que escribir un descuento').bail().isNumeric().withMessage('Tenes que escribir un número'),
	body('cantidadCuotas').notEmpty().withMessage('Tenes que escribir una cantidad de cuotas').bail().isNumeric().withMessage('Tenes que escribir un número'),
	body('etiquetas').notEmpty().withMessage('Tenes que escribir una etiqueta'),
    body('esFisico').notEmpty().withMessage('Tenes que seleccionar un modo de juego'),
    body('categories').notEmpty().withMessage('Tenes que seleccionar al menos una categoria'),
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

module.exports = productValidations;