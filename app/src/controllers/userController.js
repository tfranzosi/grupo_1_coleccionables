userController={
    login: (req, res) => {
        res.render('users/login');
    },

    register: (req, res) => {
        res.render('users/register');
    },

    carrito: (req, res) => {
        res.render('users/productCart');
    }

}

module.exports = userController;