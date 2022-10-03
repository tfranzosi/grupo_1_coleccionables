const db = require('../../database/models');
const queries = require('../../database/queries/index');
require('dotenv').config();



const apiProductController = {

    //Ruta /api/products
    list: async (req, res) => {
        try {
            //Tomamos parametros de la ruta
            let pageNumber = 1;
            if (req.query.page !== undefined) pageNumber = parseInt(req.query.page);
            let itemsPerPage = 6;
            if (req.query.limit !== undefined) itemsPerPage = parseInt(req.query.limit);

            //Hago los pedidos a la Base de Datos
            const productCount = await queries.Product.searchCount('');
            const pageCount = Math.ceil(productCount/itemsPerPage);
            const products = await queries.Product.search('',itemsPerPage,pageNumber - 1);

            let previousPage = `${process.env.BACKEND_ADDRESS}/api/products?page=${pageNumber - 1}`;
            if (itemsPerPage != 6) previousPage += `&limit=${itemsPerPage}`;
            if (pageNumber <= 1) previousPage = null;
            
            let nextPage = `${process.env.BACKEND_ADDRESS}/api/products?page=${pageNumber + 1}`;
            if (itemsPerPage != 6) nextPage += `&limit=${itemsPerPage}`;
            if (pageNumber >= pageCount) nextPage = null;
            

            // const productCount = await queries.Product.searchCount('');
            const categoryCount = await queries.Category.countProductByCategory();

            // const products = await queries.Product.showAll();
            const allProducts = products.map( product => {
                if (product.discount > 0) product.regular_price *= (1 - (product.discount / 100));
                return {
                    id: product.id,
                    sku: product.sku,
                    name: product.product_name,
                    price: product.regular_price,               //Ver logica por los descuentos
                    description: product.short_description,
                    categories: product.categories.map( category => category.name),
                    detail: `${process.env.BACKEND_ADDRESS}/api/products/${product.id}`,
                    view: `${process.env.BACKEND_ADDRESS}/productos/${product.id}`
                }
            })

            const [[{sales}]] = await queries.Order.showMeTheMoney();
            

            return res.status(200).json({
                sales,
                productCount,
                categoryCount: Object.keys(categoryCount).length,
                countByCategory: categoryCount,
                previousPage,
                nextPage,
                products: allProducts
            })
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    },
    detail: async (req,res) => {
        try {


            //Hago los pedidos a la Base de Datos
            const product = await queries.Product.find(req.params.id);

            return res.status(200).json({
                id: product.dataValues.id,
                sku: product.dataValues.sku,
                product_name: product.dataValues.product_name,
                short_description: product.dataValues.short_description,
                long_description: product.dataValues.long_description,
                regular_price: product.dataValues.regular_price,
                discount: product.dataValues.discount,
                fee_q: product.dataValues.fee_q,
                tags: product.dataValues.tags,
                is_offer: product.dataValues.is_offer,
                is_physical: product.dataValues.is_physical,
                image_url: product.dataValues.image_url,
                visits_q: product.dataValues.visits_q,
                sales_q: product.dataValues.sales_q,
                best_seller: product.dataValues.best_seller,
                categories: product.categories.map( category => category.name),
            }) 
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    },

    lastProduct: async (req,res) => {
        try {
            const product = await queries.Product.lastProduct();
            return res.status(200).json({
                sku: product.dataValues.sku,
                product_name: product.dataValues.product_name,
                short_description: product.dataValues.short_description,
                regular_price: product.dataValues.regular_price,
                discount: product.dataValues.discount,
                tags: product.dataValues.tags,
                is_offer: product.dataValues.is_offer?true:false,
                is_physical: product.dataValues.is_physical?true:false,
                image_url: `${process.env.BACKEND_ADDRESS}${product.dataValues.image_url}`,
                categories: product.categories.map( category => category.name),
                view: `${process.env.BACKEND_ADDRESS}/productos/${product.dataValues.id}`
            })
        } catch (e) {
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    },

     //Elimina de la DB
     delete: async (req, res) => {
        try{
            const product = await queries.Product.find(req.params.id)
            if(product){
                await queries.Product.delete(req.params.id);
                res.status(200).json({
                    status: 'Deleted',
                    deletedProduct: product
                })
            } else {
                res.status(200).json({
                    status: 'Product not found'
                })
            }
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            res.status(400).json(e);
        }
     }
}

module.exports = apiProductController;