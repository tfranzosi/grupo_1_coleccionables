const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'OrderDetail';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        price:{
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        quantity: {
            type: dataTypes.MEDIUMINT(8).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'orders_details',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const OrderDetail = sequelize.define(alias, cols, config);
    
    OrderDetail.associate = function(models) {
        // Vinculacion 1:M con products
        OrderDetail.belongsTo(models.Product, {
            foreignKey: "product_id"
        }),

        // Vinculacion 1:M con categories
        OrderDetail.belongsTo(models.Order, {
            foreignKey: "order_id"
        })
    }

    return OrderDetail;
};