const db = require('../models');
const Sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    showAll: async () => await db.Product.findAll({
        include: [
            { association: 'categories' }
        ]
    }),
    
    showOnSale: async () => await db.Product.findAll({
        where: {
            is_offer: true
        },
        include: [
            { association: 'categories' }
        ],
        limit: 6
    }),

    showBestSellers: async () => await db.Product.findAll({
        order: [
            ['sales_q','DESC']
        ],
        limit: 3,
        include: [
            { association: 'categories' }
        ]
    }),

    showLastVisited: async (userId) => await db.UserVisitedProduct.findAll({
            include: [{ 
                model: db.Product,
                include: { association: 'categories'}
            }],
            where: {
                user_id: userId
            },
            order: [
                ['last_visited','DESC']
            ],
            limit: 3
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
        limit,
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

    addVisit: async (productId) => {
        //Busco el producto y saco unicamente la cantidad de visitas en visit_q
        let { visits_q } = await db.Product.findOne({
            where: {
                id: productId
            }
        });

        //A la cantidad de visitas, le agrego uno
        visits_q++;

        //Actualizo la DB solo la cantidad de visitas del producto cuyo id es el pedido
        await db.Product.update({
            visits_q
        },
        {
            where: {
                id: productId
            }
        });
    },

    addSale: async (productId) => {
        //Busco el producto y saco unicamente la cantidad de visitas en visit_q
        let { sales_q } = await db.Product.findOne({
            where: {
                id: productId
            }
        });

        //A la cantidad de visitas, le agrego uno
        sales_q++;

        //Actualizo la DB solo la cantidad de visitas del producto cuyo id es el pedido
        await db.Product.update({
            sales_q
        },
        {
            where: {
                id: productId
            }
        });
    },

    addLastVisited: async (productId , userId) => {
        db.UserVisitedProduct.create({
            user_id: userId,
            product_id: productId,
            last_visited: Date.now()
        })
    },

    lastProduct: async () => 
        db.Product.findOne({
                include: { 
                    association: 'categories'
                },
                order: [
                    ['id','DESC']
                ]
        })
}