const queries = require('../database/queries');

module.exports = {
    vist: async (req, res, next) => {
        //Agrego visita al producto en tabla products
        queries.Product.addVisit(req.params.id);

        //Agrego producto a la tabla users_visited products
        if (res.locals.isLogged === true) queries.Product.addLastVisited(req.params.id, res.locals.userLogged.id);

        next();
    }, 

    sale: async (req, res, next) => {
        //Agrego visita al producto en tabla products
        queries.Product.addSale(req.params.id);

        next();
    }
}