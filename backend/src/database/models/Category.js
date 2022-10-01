const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };

    let config = {
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function (models) {
        Category.belongsToMany(models.Product, { // models.Product -> Product es el valor de alias en movie.js
            as: 'product_categories',
            through: 'products_categories',
            foreignKey: 'product_id',
            otherKey: 'category_id',
            timestamps: true
        })
    }

    return Category
};