productController={
    producto: (req, res) => {
        res.render('products/productDetail');
    },
    
    create: (req, res) => {
        res.render('products/productCreate');
    },

    edit: (req, res) => {
        res.render('products/productEdit');
    }

}

module.exports = productController;