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
        try {
            //Hago los pedidos a la Base de Datos
            const product = await queries.Product.find(req.params.id);

            return res.status(200).json({
                id: product.dataValues.id,
                sku: product.dataValues.sku,
                product_name: product.dataValues.product_name,
                short_description: product.dataValues.short_description,
                long_description: product.dataValues.long_description,
                regular_price: product.dataValues.regular_price,
                discount: product.dataValues.discount,
                fee_q: product.dataValues.fee_q,
                tags: product.dataValues.tags,
                is_offer: product.dataValues.is_offer,
                is_physical: product.dataValues.is_physical,
                image_url: product.dataValues.image_url,
                visits_q: product.dataValues.visits_q,
                sales_q: product.dataValues.sales_q,
                best_seller: product.dataValues.best_seller,
                categories: product.categories.map( category => category.name),
            })
        } catch (e) {
            //Si hay algun error, los atajo y muestro todo vacio
            console.log('error,' , e);
            return res.status(400).json(e);
        }
    },
}

module.exports = apiProductController;