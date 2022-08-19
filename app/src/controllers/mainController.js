const queries = require('../database/queries');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


mainController = {
    index: async (req, res) => {
        try {
            //Hago los pedidos a la Base de Datos
            const [offers, bestSellers] = await Promise.all([queries.offers, queries.bestSellers]);

            res.render('index', {
                offers,
                bestSellers,
                usuario: req.session.usuario
            });
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e)
            res.render('index', {
                offers: [],
                bestSellers: [],
                usuario: req.session.usuario
            });
        }
    },

    search: async (req, res) => {
        try {
            //Hago los pedidos a la Base de Datos
            const [products] = await Promise.all([queries.searchProducts(req.query.search)]);

            res.render('products/products' , { products , title: 'Resultados de busqueda'});
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            res.render('products/products' , { products: [], title: 'Productos'});
        }
    },

    error: (req, res) => {
        res.render('error', { error })
    }

}

module.exports = mainController;