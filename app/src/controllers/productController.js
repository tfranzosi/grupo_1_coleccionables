const fs = require('fs');
const path = require('path');
const rutaDB = path.join(__dirname,'../../public/db/productdb.json');
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbParseada = JSON.parse(readDB);

const categorias = [
    "Juegos Físicos",
    "Juegos Digitales",
    "Ofertas",
    "PS4",
    "PS5",
    "Coleccionables"
];


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
        //Defino producto vacio segun mi base de datos
        let productoVacio = {};
        for (let key in dbParseada[0]) productoVacio[key] = "";

        let id = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(id);
        res.render('products/productCreate',{producto: productoVacio, categorias});
    },

    	// Create -  Method to store
	store: (req, res) => {
        let nuevoIdMaximo = productController.buscarMaximoId() + 1;
        let esOferta = productController.validarOferta(req.body.descuento);
        let esFisico = true;
        if (req.body.esFisico !== true) esFisico = false;
        let urlImagenNueva = '/images/products/default.jpg';
        if (req.file !== undefined) urlImagenNueva = '/images/products/' + req.file.filename;
        let categories = [];
        if (req.body.categories !== undefined) categories = req.body.categories;


		let nuevoProducto =  {
			id: nuevoIdMaximo,
            sku:req.body.sku,
			titulo: req.body.titulo,
            descripcionCorta:req.body.descripcionCorta,
            descripcionLarga:req.body.descripcionLarga,
			precioRegular: parseInt(req.body.precioRegular),
			descuento: parseInt(req.body.descuento),
            cantidadCuotas: parseInt(req.body.cantidadCuotas),
            etiquetas:req.body.etiquetas,
            esOferta: esOferta,  //Provisoriamente no se carga con el req.body sino validando arriba si descuento!=null
            esFisico: esFisico,
			categorias: categories,
			urlImagen: urlImagenNueva,
            visitas:0,
            vendidos:0,
            esMasVendido: false
		}
		dbParseada.push(nuevoProducto)
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,3));

		res.redirect("/productos")
	},

    editForm: (req, res) => {
        let id = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(id);
        res.render('products/productEdit',{producto: dbParseada[indice], categorias});
    },

    edit: (req,res) => { 
        let idProd = parseInt(req.params.id);
        let indice = productController.buscarIndiceProductoPorId(idProd);
        let visitasProd = parseInt(dbParseada[indice].visitas);
        let vendidosProd = parseInt(dbParseada[indice].vendidos);
        let esMasVendidoProd = dbParseada[indice].esMasVendido;
        let esOferta = productController.validarOferta(req.body.descuento); 
        let esFisico = req.body.esFisico;
        if (req.body.esFisico !== true){esFisico=false}else{esFisico=true};
        request=req.body
        let urlImagenNueva = dbParseada[indice].urlImagen;
        if (req.file !== undefined) urlImagenNueva = '/images/products/' + req.file.filename;
        console.log(request);
        //HAY QUE HACER VALIDACIONES AFUERA Y ADENTRO DECLARAR LAS VARIABLES MEJOR!!!!!!!!1
        //Ejemplo: en etiquetas usar metodos para separar por comas y pushear a un array
        let productoEditado = { 
            id: idProd, //int
            sku: req.body.sku, //str
            titulo: req.body.titulo, //str
            descripcionCorta: req.body.descripcionCorta, //str
            descripcionLarga: req.body.descripcionLarga,  //str
            precioRegular: parseInt(req.body.precioRegular), //int
            descuento: parseInt(req.body.descuento), //int
            cantidadCuotas: parseInt(req.body.cantidadCuotas), //int
            etiquetas: req.body.etiquetas,  //str
            esOferta: esOferta, //bool
            esFisico: esFisico, //bool
            categorias: req.body.categories, //str Array
            urlImagen: urlImagenNueva, //str
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
        const image = path.join(__dirname,'../../public') + dbParseada[indice].urlImagen;
// Elimino imagen jpg
        if(image !== '/images/products/default.jpg'){                         
            try {
                fs.unlinkSync(image)
            } catch(err) {
                console.error(err)
            }
        }       
        dbParseada.splice(indice,1);
        fs.writeFileSync(rutaDB,JSON.stringify(dbParseada,null,2),"utf-8");
        res.redirect('/productos');
    
    },

    buscarIndiceProductoPorId: id => { //devuelvo indice del producto en productdb
        return dbParseada.findIndex(producto => {
            return producto.id === id;
        });          
    },
    validarOferta: reqBodyDescuento => { //Recibe req.body.descuento, si es mayor a 0 hay oferta.
        if (reqBodyDescuento>0){
            return true
        }else{
            return false
        };
    },
    buscarMaximoId: () => {
        let maximo = 0;
        dbParseada.forEach(producto => {
            if (producto.id > maximo) maximo = producto.id;
        });
        return maximo;
    }
}

module.exports = productController;