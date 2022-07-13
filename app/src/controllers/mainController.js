const db = require('../../public/db/productdb.json');

mainController={
    index: (req, res) => {
        res.render('index', {
            ofertas: mainController.buscarOfertas(),
            masVendidos: mainController.buscarMasVendidos(),
            usuario: req.session.usuario
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
    },
    getTempId: () => {
        let horario = new Date();
        let tempId = horario.getHours() * 60; 
        tempId = (tempId + horario.getMinutes()) * 60;
        tempId = (tempId + horario.getSeconds()) * 1000;
        tempId += horario.getMilliseconds();
        return tempId;
    }

}

module.exports=mainController;