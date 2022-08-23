const db = require('./models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    showAll: async () => await db.Product.findAll({
        include: [
            {association: 'categories'}
        ]
    }),
    
    offers: async () => await db.Product.findAll({
        where: {
            is_offer: true
        },
        include: [
            { association: 'categories' }
        ],
        limit: 6
    }),

    bestSellers: async () => await db.Product.findAll({
        order: [
            ['sales_q','DESC']
        ],
        limit: 3,
        include: [
            { association: 'categories' }
        ]
    }),

    find: async (id) =>  await db.Product.findOne({
        where: {
            id: id
        },
        include: [
            {association: 'categories'}
        ]
    }),

    search: async (query,limit,page) => await db.Product.findAll({
        where: {
            [Op.or]: [
                {product_name: { [Op.like]: '%' + query + '%' }},
                {short_description: { [Op.like]: '%' + query + '%' }},
                {long_description: { [Op.like]: '%' + query + '%' }}

            ]
        },
        limit: limit,
        offset: page * limit,
        include: [
            {association: 'categories'}
        ]
    }),

    searchCount: async (query) => await db.Product.count({
        where: {
            [Op.or]: [
                {product_name: { [Op.like]: '%' + query + '%' }},
                {short_description: { [Op.like]: '%' + query + '%' }},
                {long_description: { [Op.like]: '%' + query + '%' }}

            ]
        }
    }),

    create: async (product) => {
        //Creo nuevo producto en la tabla products
        const newProduct = await db.Product.create(product);

        //Formateo las categorias y las creo en la tabla products_categories
        let categories = product.categories.map(category => {
            return {
                product_id: newProduct.id,
                category_id: category
            }
            
        });
        await db.ProductCategory.bulkCreate(categories);
    },

    update: async (product) => {
        //Creo nuevo producto en la tabla products
        await db.Product.update(product,{
            where: {
                id: product.id
            }
        });

        //Borro todas las relaciones entre product_categories
        await db.ProductCategory.destroy({
            where:{
                product_id: product.id
            }
        });

        //Formateo las categorias y las creo en la tabla products_categories
        if( product.categories != null ){ 
            let categories = product.categories.map(category => {
                return {
                    product_id: product.id,
                    category_id: category
                }
            });

            await db.ProductCategory.bulkCreate(categories);
        }
    },

    delete: async (id) => await db.Product.destroy({
        where: {
            id: id
        }
    }),

    obtainCategories: async () => await db.Category.findAll()


}