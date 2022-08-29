const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    getCartById: async (id) => await db.OrderDetail.findAll({
        include:
            [
                {
                    model: db.Order,
                    where: {
                        user_id: id
                    },
                    include: 
                    [
                        {
                            association: 'status_orders',
                            where: {
                                name: 'Pendiente'
                            }
                        },
                        { association: 'user_orders'}
                    ],
                    order: ['user_id','ASC']
                },
                { model: db.Product }
            ],
            order: [['order_id','ASC']]
        }),
        
        getTotalPriceById: async (id) => await sequelize.query('SELECT SUM(price * quantity) AS total FROM orders_details WHERE order_id = ' + id),
        
        update: async (productDetail) => await db.OrderDetail.update(
            {
                quantity: productDetail.product_quantity
            },
            {
                where: {
                    order_id: productDetail.order_id,
                    product_id: productDetail.product_id
                }
            }
        )
}
