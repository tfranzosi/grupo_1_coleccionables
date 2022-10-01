const PUERTO = 3001;

//Modulos
const express = require('express');
const app  = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const authMiddleware = require('./src/middlewares/authMiddleware')
const cors = require('cors');

// Routers
const apiRouter = require('./src/routes/apiRouter');
const mainRouter = require('./src/routes/mainRouter');
const productRouter = require('./src/routes/productRouter');
const userRouter = require('./src/routes/userRouter');
const cookieParser = require('cookie-parser');


// MIDDLEWARES
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session( {secret: 'gamestore2022',resave:false,
saveUninitialized: false
}));
app.use(cookieParser());
app.use(authMiddleware);
app.use(cors({origin: '*'}));


// Inicio Servidor
app.listen(process.env.PORT || PUERTO, () => {
    console.log(`Up & Running en http://127.0.0.1:${PUERTO}`);
});

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/src/views'));


// INICIO DE LAS RUTAS
app.use('/', mainRouter);
app.use('/productos', productRouter);
app.use('/usuarios', userRouter);
app.use('/api', apiRouter);
