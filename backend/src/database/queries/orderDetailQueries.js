const db = require('../models');
const sequelize = db.sequelize;
const queries = require('.')
const { Op } = require("sequelize");


module.exports = {
    findMatch: async (orderId, productId) => await db.OrderDetail.findOne({
        where: {
            order_id: orderId,
            product_id: productId
        }
    }),

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

        create: async (orderId, productId) =>{
            let product = await queries.Product.find(productId);
            if (product.discount > 0) product.regular_price *= 1 - (parseInt(product.discount) / 100);

            let isProductAdded = await queries.OrderDetail.findMatch(orderId, productId);

            //Agrego el produco en la tabla intermedia orders_details
            if( isProductAdded === null) await db.OrderDetail.create({
                order_id: orderId,
                product_id: productId,
                price: product.regular_price,
                quantity: 1
            })

            //Me fijo la cantidad de items y el precio de la orden
            let {items_q,ammount} = await db.Order.findOne({
                where: {
                    id: orderId
                }
            })

            items_q += 1;

            ammount = parseFloat(ammount) + product.regular_price;


            //Agrego el producto y precio en la tabla orders
            await db.Order.update(
                {
                    items_q,
                    ammount
                },
                {
                    where:
                    {
                        id: orderId
                    }
                }
            )
        },

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
