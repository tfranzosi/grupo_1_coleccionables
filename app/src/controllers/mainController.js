
mainController={
    index: (req, res) => {
        res.render('index');
    },
    
    producto: (req, res) => {
        res.render('productDetail');
    },
    
    carrito: (req, res) => {
        res.render('productCart');
    },
    
    login: (req, res) => {
        res.render('login');
    },

    register: (req, res) => {
        res.render('register');
    }

}


module.exports=mainController;