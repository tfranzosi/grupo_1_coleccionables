const db = require('./models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    showAll: db.Product.findAll({
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

    find: (id) =>  db.Product.findOne({
        where: {
            id: id
        },
        include: [
            {association: 'categories'}
        ]
    }),

    search: (query,limit) => db.Product.findAll({
        where: {
            [Op.or]: [
                {product_name: { [Op.like]: '%' + query + '%' }},
                {short_description: { [Op.like]: '%' + query + '%' }},
                {long_description: { [Op.like]: '%' + query + '%' }}

            ]
        },
        limit: limit,
        include: [
            {association: 'categories'}
        ]
    }),

    create: (product) => {
        db.Product.create(product);
    },
    delete: (id) => db.Product.destroy({
        where: {
            id: id
        }
    })


}