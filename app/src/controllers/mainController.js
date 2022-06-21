//CONTROLLERS.
//Seguramente tengamos que dividir en userControllers y productControllers
mainController={
    index: (req, res) => {
        res.render('index');
    }

}

module.exports=mainController;