const express = require('express');
const app  = express();
const path = require('path');

const PUERTO = 3000;

app.use(express.static('public'));

app.listen(PUERTO, () => {
    console.log(`Up & Running en http://127.0.0.1:${PUERTO}`);
});

//      ---     INICIO DE LAS RUTAS    ---

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/productos', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});
