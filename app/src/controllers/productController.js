const db = require('../../public/db/db.json');

productController={
    producto: (req, res) => {
        res.render('products/productDetail',{producto: productController.buscarProductoPorId(parseInt(req.params.id))});
    },
    
    create: (req, res) => {
        res.render('products/productCreate');
    },

    edit: (req, res) => {
        res.render('products/productEdit',{producto: productController.buscarProductoPorId(parseInt(req.params.id))});
    },
    buscarProductoPorId: function (id) {
        return db.completa.find(producto => {
            return producto.sku === id;
        });
    }

}

module.exports = productController;