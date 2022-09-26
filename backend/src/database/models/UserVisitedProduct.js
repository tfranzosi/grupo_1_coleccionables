const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'UserVisitedProduct';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        last_visited: {
            type: dataTypes.DATE,
            allowNull: false
        }
    };

    let config = {
        tableName: 'users_visited_products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const UserVisitedProduct = sequelize.define(alias, cols, config);
    
    UserVisitedProduct.associate = function(models) {
        // Vinculacion M:1 con products
        UserVisitedProduct.belongsTo(models.Product, {
            foreignKey: "product_id"
        }),

        // Vinculacion M:1 con users
        UserVisitedProduct.belongsTo(models.User, {
            foreignKey: "user_id"
        })
    }

    return UserVisitedProduct;
};