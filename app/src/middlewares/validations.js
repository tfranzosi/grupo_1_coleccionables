const { body } = require('express-validator');
const path = require('path');
const queries = require('../database/queries')


module.exports = {
    product: [
        body('sku').notEmpty().withMessage('Tenes que escribir un sku'),
        body('product_name').notEmpty().withMessage('Tenes que escribir un titulo'),
        body('short_description').notEmpty().withMessage('Tenes que escribir una descripcion corta del producto'),
        body('long_description').notEmpty().withMessage('Tenes que escribir una descripcion larga del producto'),
        body('regular_price').notEmpty().withMessage('Tenes que escribir un precio').bail().isNumeric().withMessage('Tenes que escribir un número'),
        body('discount').notEmpty().withMessage('Tenes que escribir un descuento').bail().isNumeric().withMessage('Tenes que escribir un número'),
        body('fee_q').notEmpty().withMessage('Tenes que escribir una cantidad de cuotas').bail().isNumeric().withMessage('Tenes que escribir un número'),
        body('tags').notEmpty().withMessage('Tenes que escribir una etiqueta'),
        body('is_physical').notEmpty().withMessage('Tenes que seleccionar un modo de juego'),
        body('categories').notEmpty().withMessage('Tenes que seleccionar al menos una categoria'),
        body('image_url').custom((value, { req }) => {
            let file = req.file;
            let acceptedExtensions = ['.jpg','.jpeg', '.png', '.gif'];
            if (file !== undefined) {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
    
            return true;
        })
    ],

    register: [
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
        body('password').trim().notEmpty().withMessage('Tienes que escribir una contraseña'),
        body('password2').trim().notEmpty().withMessage('Tienes que escribir una contraseña').bail()
                         .custom((value,{req}) =>{
                             if(value !== req.body.password){
                                 throw new Error('Las contraseñas no coinciden')
                             }
                             return true;
                         }),
        body('conditions').notEmpty().withMessage('Debes estar de acuerdo con los Términos y Condiciones')/*,
        body('image_url').custom((value, { req }) => {
        	let file = req.file;
            let acceptedExtensions = ['.jpg', '.png', '.gif'];
            if (file !== undefined) {
                let fileExtension = path.extname(file.originalname);
                if (!acceptedExtensions.includes(fileExtension)) {
                    throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                }
            }
        	return true;
        })}
        */
    ],
    login: [
        body('user').notEmpty().withMessage('Tenes que escribir un usuario').bail()
        .custom(user => {
            let userDB = queries.User.findByUser(user);
            if (userDB == null) {
                throw new Error('El usuario o email no se encuentra en la base de datos');
            }
            return true
        }),
        body('password').notEmpty().withMessage('Tenes que escribir una contraseña').bail()
        .custom(password => {
            let passwordDB = queries.User.findByPass(password);
            if (passwordDB == null) {
                throw new Error('La contraseña no se encuentra en la base de datos');
            }
            return true
        })

    ]
}