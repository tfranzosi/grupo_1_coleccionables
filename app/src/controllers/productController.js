const fs = require('fs');
const path = require('path');
const rutaDB = path.join(__dirname,'../../public/db/productdb.json');
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbParseada = JSON.parse(readDB);

productController={
    showAll: (req, res) => {
        res.render('products/products',{productos: dbParseada});
    },
    producto: (req, res) => {
        let id = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(id);
        res.render('products/productDetail',{producto: dbParseada[indice]});
    },
    
    create: (req, res) => {
        let id = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(id);
        res.render('products/productCreate',{productos: dbParseada});
    },

    	// Create -  Method to store
	store: (req, res) => {
		let idMaximo = dbParseada.length
		let nuevoProducto =  {
			id: idMaximo + 1,
            sku:req.body.sku,
			titulo: req.body.titulo,
            descripcionCorta:req.body.descripcionCorta,
            descripcionLarga:req.body.descripcionLarga,
			precioRegular: parseInt(req.body.precioRegular),
			descuento: parseInt(req.body.descuento),
            cantidadCuotas: parseInt(req.body.cantidadCuotas),
            etiquetas:req.body.etiquetas,
            esOferta:req.body.esOferta,
            esFisico:req.body.esFisico,
			categorias: req.body.categories,
			urlImagen: "/images/products/" + req.file.filename,
            visitas:0,
            vendidos:0,
            esMasVendido:false
		}
		dbParseada.push(nuevoProducto)
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,3));

		res.redirect("/productos")
	},

    editForm: (req, res) => {
        let id = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(id);
        res.render('products/productEdit',{producto: dbParseada[indice]});
    },

    edit: (req,res) => { 
        let idProd = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(idProd);
        let visitasProd = dbParseada[indice].visitas;
        let vendidosProd = dbParseada[indice].vendidos;
        let esMasVendidoProd = dbParseada[indice].esMasVendido;
        let esOferta = req.body.esOferta; 
        if (esOferta !== true){esOferta=false}else{esOferta=true};
        let esFisico = req.body.esFisico; 
        if (esFisico !== true){esFisico=false}else{esFisico=true};
        requesttt=req.body
        console.log(requesttt)
        //HAY QUE HACER VALIDACIONES AFUERA Y ADENTRO DECLARAR LAS VARIABLES MEJOR!!!!!!!!1
        //Ejemplo: en etiquetas usar metodos para separar por comas y pushear a un array
        let productoEditado = { 
            id:idProd, //int
            sku: req.body.sku, //str
            titulo: req.body.titulo, //str
            descripcionCorta: req.body.descripcionCorta, //str
            descripcionLarga: req.body.descripcionLarga,  //str
            precioRegular: parseInt(req.body.precioRegular), //int
            descuento: req.body.descuento, //bool
            cantidadCuotas: parseInt(req.body.cantidadCuotas), //int
            esOferta: esOferta, //bool
            esFisico: esFisico, //bool
            etiquetas: req.body.etiquetas,  //str Deberia ser array? o se muestra con substrings separados x coma?
            categorias: req.body.categories, //str Array
            urlImagen: req.body.Imagen, //str
            visitas: visitasProd, //int             /*Implementar mecanismos de contador*/
            vendidos: vendidosProd, //int           /*Implementar mecanismos de contador*/
            esMasVendido: esMasVendidoProd //bool   /*Implementar mecanismo dependiente de anterior atributo*/
        }
        console.log(productoEditado);
        dbParseada[indice]=productoEditado;
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,2),"utf-8");
        res.redirect(`/productos/${idProd}`);  
    },

    delete: (req, res) => {
        let id = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(id);
        dbParseada.splice(indice,1);
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,3));
        res.redirect('/productos');
    
    },

    buscarIndiceProductoPorId: function (id) { //devuelvo indice del producto en productdb
        return dbParseada.findIndex(producto => {
            return producto.id === id;
        });          
    }
}

module.exports = productController;