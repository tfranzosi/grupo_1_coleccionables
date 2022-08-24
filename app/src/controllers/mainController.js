const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const queries = require('../database/queries/index');


mainController = {
    index: async (req, res) => {
        try {
            //Hago los pedidos a la Base de Datos
            const offers = await queries.Product.offers();
            const bestSellers = await queries.Product.bestSellers();
            
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

    showCarts: async (req,res) => {
        const orders = await db.Order.findAll();
        res.json(orders);
    },

    error: (req, res) => {
        res.render('error', { error })
    }

}

module.exports = mainController;