const db = require('../../public/db/productdb.json');

mainController={
    index: (req, res) => {
        res.render('index', {
            ofertas: mainController.buscarOfertas(),
            masVendidos: mainController.buscarMasVendidos()
        });
    },
    buscarOfertas: () => {
        return db.filter(producto => {
            return producto.esOferta;
        });
    },
    buscarMasVendidos: () => {
        return db.filter(producto => {
            return producto.esMasVendido;
        });
    }

}

module.exports=mainController;