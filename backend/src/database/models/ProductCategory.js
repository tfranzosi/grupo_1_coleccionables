const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductCategory';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'products_categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const ProductCategory = sequelize.define(alias, cols, config);
    
    ProductCategory.associate = function(models) {
        // Vinculacion M:1 con products
        ProductCategory.belongsTo(models.Product, {
            foreignKey: "product_id"
        }),
        // Vinculacion M:1 con categories
        ProductCategory.belongsTo(models.Category, {
            foreignKey: "category_id"
        })
    }

    return ProductCategory
};