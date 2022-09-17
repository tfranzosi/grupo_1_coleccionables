const queries = require('../../database/queries/index');

const apiProductController = {
    list: async (req, res) => {
        try {
            //Hago los pedidos a la Base de Datos
            const productCount = await queries.Product.searchCount('');
            const categoryCount = await queries.Category.countProductByCategory();
            const products = await queries.Product.showAll();
            const allProducts = products.map( product => {
                return {
                    id: product.id,
                    name: product.product_name,
                    description: product.short_description,
                    categories: product.categories.map( category => category.name),
                    detail: `/productos/${product.id}`
                }

            })

            return res.status(200).json({
                count: productCount,
                countByCategory: categoryCount,
                products: allProducts
            })
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    },
    detail: async (req,res) => {
        res.send("hola products")
    }
}

module.exports = apiProductController;