const fs = require('fs');
const path = require('path');
const productQueries = require('../database/productQueries');

const rutaDB = path.join(__dirname,'../../public/db/productdb.json');
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbParseada = JSON.parse(readDB);
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


productController={
    showAll: async (req, res) => {
        try {
            //Hago los pedidos a la Base de Datos
            let [products] = await Promise.all([productQueries.showAll]);
            res.render('products/products' , { products , title: 'Productos'});
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('products/products' , { products: [], title: 'Productos'});
        }
    },

    detail: async (req, res) => {
        try{
            let [product] = await Promise.all([productQueries.find(req.params.id)]);

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
    
    create: async (req, res) => {
        try{
            //Defino producto vacio segun mi base de datos
            let [[productoVacio]] = await Promise.all([productQueries.search('',1)]);
            productoVacio = productoVacio['dataValues']
            
            for (let key in productoVacio) productoVacio[key] = '';

            const [categories] = await Promise.all([productQueries.obtainCategories]);

            res.render('products/productCreate', {product: productoVacio, categories});



        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('products/productCreate' , { producto: productoVacio, title: 'Productos'});
        }
    },
    	// Create -  Method to store
	store: async (req, res) => {
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

    //Muestra el formulario
    editForm: async (req, res) => {

        const [categories] = await Promise.all([productQueries.obtainCategories]);
        let [product] = await Promise.all([productQueries.find(req.params.id)]);

        product.categories = product.categories.map(category => {
            return category.id
        });
        res.render('products/productEdit' , { product, categories } );
    },

    //Actualiza la DB - UPDATE (POST)
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

        // let idProd = parseInt(req.params.id);
        // let indice = productController.buscarIndiceProductoPorId(idProd);
        // let visitasProd = parseInt(dbParseada[indice].visitas);
        // let vendidosProd = parseInt(dbParseada[indice].vendidos);
        // let esMasVendidoProd = dbParseada[indice].esMasVendido;
        // let esOferta = productController.validarOferta(req.body.descuento); 
        // let esFisico = req.body.esFisico;
        // if (req.body.esFisico !== true){esFisico=false}else{esFisico=true};
        // request=req.body
        // let urlImagenNueva = dbParseada[indice].urlImagen;
        // if (req.file !== undefined) urlImagenNueva = '/images/products/' + req.file.filename;

        // let productoEditado = { 
        //     id: idProd,
        //     sku: req.body.sku,
        //     titulo: req.body.titulo,
        //     descripcionCorta: req.body.descripcionCorta,
        //     descripcionLarga: req.body.descripcionLarga,
        //     precioRegular: parseInt(req.body.precioRegular),
        //     descuento: parseInt(req.body.descuento),
        //     cantidadCuotas: parseInt(req.body.cantidadCuotas),
        //     etiquetas: req.body.etiquetas,
        //     esOferta: esOferta,
        //     esFisico: esFisico,
        //     categorias: req.body.categories,
        //     urlImagen: urlImagenNueva,
        //     visitas: visitasProd,
        //     vendidos: vendidosProd,
        //     esMasVendido: esMasVendidoProd
        // }
        // dbParseada[indice]=productoEditado;
        // fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,2),"utf-8");
        // res.redirect(`/productos/${idProd}`);  
    },

    delete: async (req, res) => {
        try{
            await Promise.all([productQueries.delete(req.params.id)]);
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
