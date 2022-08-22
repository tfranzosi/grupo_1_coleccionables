const { validationResult } = require('express-validator');

//Configuro DB a usar
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const productQueries = require('../database/productQueries');


productController={
    //Muestra vista de todos los productos
    showAll: async (req, res) => {
        try {
            //Hago los pedidos a la Base de Datos
            products = await productQueries.showAll();
            res.render('products/products' , { products , title: 'Productos'});
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('products/products' , { products: [], title: 'Productos'});
        }
    },

    //Muesta vista del detalle producto
    detail: async (req, res) => {
        try{
            //Hago los pedidos a la Base de Datos
            let product = await productQueries.find(req.params.id);
            if(product !== null){
                res.render('products/productDetail' , { product });
            } else {
                res.render('error',{error: 'No existe el producto seleccionado'})
            }
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('products/productDetail' , { products: {} });
        }
    },
    
    //Muestra el formulario para creacion de producto
    create: async (req, res) => {
        try{
            //Defino producto vacio segun mi base de datos
            let [productoVacio] = await productQueries.search('',1);
            productoVacio = productoVacio['dataValues']
            
            for (let key in productoVacio) productoVacio[key] = '';

            const categories = await productQueries.obtainCategories;

            res.render('products/productCreate', {product: productoVacio, categories});



        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('products/productCreate' , { producto: productoVacio, title: 'Productos'});
        }
    },
    // Guarda en la DB
	store: async (req, res) => {
        //Realizo las validaciones
        const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('products/productCreate', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

        try{
            let product = productController.validateProduct(req.body,req.file);
            await productQueries.create(product);
            res.redirect("/productos");
        } catch (e) {
            console.log('error: ',e);
            res.send(e);
        }
	},

    //Muestra el formulario para edicion producto
    editForm: async (req, res) => {
        try{
            const categories = await productQueries.obtainCategories();
            let product = await productQueries.find(req.params.id);
    
            product.categories = product.categories.map(category => {
                return category.id
            });
            res.render('products/productEdit' , { product, categories } );
        } catch (e) {
            console.log('error: ',e);
            res.send(e);
        }
    },

    //Actualiza de la DB
    edit: async (req,res) => { 

        try{
            let product = productController.validateProduct(req.body,req.file);
            product.id = req.params.id;

            await productQueries.update(product);
            res.redirect("/productos");
        } catch (e) {
            console.log('error: ',e);
            res.send(e);
        }
    },

    //Elimina de la DB
    delete: async (req, res) => {
        try{
            await productQueries.delete(req.params.id);
            res.redirect('/productos')
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('error' , { error: e });
        }
    },

    /* METODOS ACCESORIOS*/

    validateProduct: (product, imageFile) => {
        //Veo si es oferta o no
        product.is_offer = false;
        if (product.discount > 0) product.is_offer = true;
        //Veo si es fisico o no
        product.is_physical = false;
        if (product.is_physical == 'true') product.is_physical = true;
        //Cambio la imagen a por defecto
        if(product.image_url === null) product.image_url = '/images/products/default.jpg';
        if (imageFile !== undefined) product.image_url = '/images/products/' + imageFile.filename;
     
        if(product.categories == null) product.categories=null;
        else if(product.categories.length <= 1) product.categories=[product.categories];

        product.visits_q = 0;
        product.sales_q = 0;
        product.best_seller = 0;

        return product
    }
}

module.exports = productController;
