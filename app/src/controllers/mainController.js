//CONTROLLERS.
//Seguramente tengamos que dividir en userControllers y productControllers
mainController={
    index: (req, res) => {
        res.render('users/index');
    },
    
    producto: (req, res) => {
        res.render('products/productDetail');
    },
    
    carrito: (req, res) => {
        res.render('products/productCart');
    },
    
    login: (req, res) => {
        res.render('users/login');
    },

    register: (req, res) => {
        res.render('users/register');
    },

    create: (req, res) => {
        res.render('products/productCreate');
    },

    edit: (req, res) => {
        res.render('products/productEdit');
    }

}

module.exports=mainController;