const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    showAllProducts: db.Product.findAll({
        include: [
            {association: 'categories'}
        ]
    }),

    offers: db.Product.findAll({
        where: {
            is_offer: true
        },
        include: [
            { association: 'categories' }
        ],
        limit: 6
    }),

    bestSellers: db.Product.findAll({
        order: [
            ['sales_q','DESC']
        ],
        limit: 3,
        include: [
            { association: 'categories' }
        ]
    }),

    findProduct: (id) =>  db.Product.findOne({
        where: {
            id: id
        },
        include: [
            {association: 'categories'}
        ]
    }),

    searchProducts: (query) => db.Product.findAll({
        where: {
            [Op.or]: [
                {product_name: { [Op.like]: '%' + query + '%' }},
                {short_description: { [Op.like]: '%' + query + '%' }},
                {long_description: { [Op.like]: '%' + query + '%' }}

            ]
        },
        include: [{
            association: 'categories'
        }
        ]
    }),


}