//CONTROLLERS.
//Seguramente tengamos que dividir en userRouter y productRouter consumiendo sus respectivos controllers.

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');


router.get('/', mainController.index);
router.get("/search", mainController.search);
router.get('/error', mainController.error);

module.exports = router;