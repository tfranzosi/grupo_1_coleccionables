const queries = require('../database/queries');

module.exports = {
    visted: async (req, res, next) => {
        //Agrego producto a la tabla users_visited products
        if (res.locals.isLogged === true) queries.Product.addLastVisited(req.params.id, res.locals.userLogged.id);

        //Agrego visita al producto en tabla products
        queries.Product.addVisit(req.params.id);
        
        next();
    }
}