const express = require('express');
const app  = express();
const path = require('path');
const mainRouter= require('./src/routes/mainRouter')
const PUERTO = 3000;

app.use(express.static(__dirname + '/public'));


app.listen(process.env.PORT || PUERTO, () => {
    console.log(`Up & Running en http://127.0.0.1:${PUERTO}`);
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/src/views'))

//      ---     INICIO DE LAS RUTAS    ---
app.use('/', mainRouter)

