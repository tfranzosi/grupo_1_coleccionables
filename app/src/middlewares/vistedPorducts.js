const queries = require('../database/queries/index');

async function vistedProducts(req, res, next) {

    if (res.locals.isLogged === true) console.log('\n\n\nEsta Logueado!!!\n\n\n');
    
    next();
}

module.exports = visitedProducts