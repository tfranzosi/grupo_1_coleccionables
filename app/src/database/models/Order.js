const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Order';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: dataTypes.BIGINT(10),
        status_id: dataTypes.BIGINT(10),
        ammount: {
            type: dataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false
        },
        shipping_address: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        created_at: {
            type: dataTypes.TIMESTAMP,
            defaultValue: null,
        },
        updated_at: {
            type: dataTypes.TIMESTAMP,
            defaultValue: null,
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Order = sequelize.define(alias, cols, config); 

    Order.associate = function (models) {
        Order.belongsToMany(models.Product, { // models.Product -> Product es el valor de alias en movie.js
            as: 'products',
            through: 'product_options',
            foreignKey: 'product_id',
            otherKey: 'category_id',
            timestamps: false
        })

        Order.belongsTo(models.Status, { // models.Status -> Status es el valor de alias en genres.js
            as: "status",
            foreignKey: "status_id"
        })

        Order.belongsTo(models.User, { // models.User -> User es el valor de alias en genres.js
            as: "users",
            foreignKey: "user_id"
        })

        
    }

    return Order
};