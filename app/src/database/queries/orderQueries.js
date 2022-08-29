const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    showAll: async () => await db.Order.findAll({
        include:
        { association: 'status_orders'}
    }),
    
    update: async (order) => db.Order.update({
            items_q: order.totalQuantity,
            status_id: 3,  
            ammount: order.ammount
        },
        {
            where: {
                id: order.id
            }
        }
    )
}