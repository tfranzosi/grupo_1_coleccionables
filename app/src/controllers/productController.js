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
        let indice = productController.buscarProductoPorId(id);
        res.render('products/productDetail',{producto: dbParseada[indice]});
    },
    
    create: (req, res) => {
        let id = parseInt(req.params.id);
        let indice = productController.buscarProductoPorId(id);
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
        let indice = productController.buscarProductoPorId(id);
        res.render('products/productEdit',{producto: dbParseada[indice]});
    },

    delete: (req, res) => {
        let id = parseInt(req.params.id);
        let indice = productController.buscarProductoPorId(id);
        dbParseada.splice(indice,1);
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,3));
        res.redirect('/productos');
    
    },

    buscarProductoPorId: function (id) { //devuelvo indice del producto en productdb
        return dbParseada.findIndex(producto => {
            return producto.id === id;
        });          
    },

    edit: (req,res) => { //MV: PUShEO LA BASE PERO LUEGO LA IMPLEMENTO
        let id = req.params.id;
        /*

        let productoEditado = {
            sku:req.body.SKU,
            titulo:req.body.titulo,
            descripcionCorta:req.body.short_desc,
            descripcionLarga:req.body.long_desc,
            precioRegular:req.body.normal_price,
            precioOferta:req.body.offer_price,
            descuento:req.body.discount,
            cantidadCuotas:req.body.cuotas,
            valorCuota:req.body.cuotas_value,
            esOferta:req.body.atributo_precio,
            esFisico:req.body.atributo_estado,
            categorias:req.body.categories,
            urlImagen:req.body.imagen
        }
        
        // for(let atributo in readDBparseada.completa[indice]){
        //     if readDBparseada.completa[indice].atributo === productoEditado.atributo
        // }
        
        readDBparsed.completa[id-1]=productoEditado;
        fs.writeFileSync(rutaDB,JSON.stringify(readDBparsed,null,2));    */ 
        res.redirect(`/productos/sku/${id}`);  
    }
}

module.exports = productController;