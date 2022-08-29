const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    /*update: async (order) => await db.Order.update(
        { quantity: order.quantity
        },
        { where: {
            id: order.id
            }
        }
    )
    */
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