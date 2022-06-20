const express = require('express');
const app  = express();
const path = require('path');

const PUERTO = 3000;

app.use(express.static(__dirname + '/public'));


app.listen(process.env.PORT || PUERTO, () => {
    console.log(`Up & Running en http://127.0.0.1:${PUERTO}`);
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/app/views'))

//      ---     INICIO DE LAS RUTAS    ---

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/producto', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
});

app.get('/inicioSesion', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});
