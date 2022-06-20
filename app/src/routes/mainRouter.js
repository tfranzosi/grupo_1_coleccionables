const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.get('/', mainController.index);

router.get('/producto', mainController.producto);

router.get('/carrito', mainController.carrito);

router.get('/inicioSesion', mainController.login);

router.get('/registro', mainController.register);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/index.ejs'));
// });

// app.get('/producto', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/productDetail.ejs'));
// });

// app.get('/carrito', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/productCart.ejs'));
// });

// app.get('/inicioSesion', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/login.ejs'));
// });

// app.get('/registro', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/register.ejs'));
// });

module.exports=router;