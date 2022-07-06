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
    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase();
        let searchResults = []

        for (let i=0; i < db.length; i++){
            if(db[i].titulo.toLowerCase().includes(busqueda) || db[i].descripcionCorta.toLowerCase().includes(busqueda) || db[i].descripcionLarga.toLowerCase().includes(busqueda)) {
                searchResults.push(db[i])
            }
        }
        res.render("products/searchResults",{searchResults : searchResults} )
    }

}

module.exports=mainController;