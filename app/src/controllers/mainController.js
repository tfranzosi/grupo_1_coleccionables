const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const queries = require('../database/queries/index');


mainController = {
    index: async (req, res) => {
        try {
            //Hago los pedidos a la Base de Datos
            let lastViewed = [];
            if (res.locals.isLogged) {
                lastViewed = await queries.Product.showLastVisited(res.locals.userLogged.id);
                lastViewed = lastViewed.map( visit => visit.Product['dataValues']);
            }
            const onSale = await queries.Product.showOnSale();
            const bestSellers = await queries.Product.showBestSellers();
            
            res.render('index', {
                lastViewed,
                onSale,
                bestSellers,
                usuario: req.session.usuario
            });
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e)
            res.render('index', {
                lastViewed: [],
                onSale: [],
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