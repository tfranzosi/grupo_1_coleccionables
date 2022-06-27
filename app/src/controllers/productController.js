const fs = require('fs');
const path = require('path');
const rutaDB = path.join(__dirname,'../../public/db/db.json');
const db = require(rutaDB);
const readDB = fs.readFileSync(rutaDB,'utf-8');
const dbparseada = JSON.parse(readDB);

productController={
    producto: (req, res) => {
        res.render('products/productDetail',{producto: productController.buscarProductoPorId(parseInt(req.params.id))});
    },
    
    create: (req, res) => {
        res.render('products/productCreate',{producto: db});
    },

    editForm: (req, res) => {
        res.render('products/productEdit',{producto: productController.buscarProductoPorId(parseInt(req.params.id))});
    },
    buscarProductoPorId: function (id) { //FALTA EDITAR PARA QUE DEVUELVA INDEX, COMO HABLAMOS EN LLAMADA
        return db.completa.find(producto => {
            return producto.sku === id;
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