const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        category_name: {
            type: dataTypes.STRING(50),
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
    const Category = sequelize.define(alias, cols, config); 

    Category.associate = function (models) {
        Category.belongsToMany(models.Product, { // models.Product -> Product es el valor de alias en movie.js
            as: 'products_categories',
            through: 'product_categories',
            foreignKey: 'product_id',
            otherKey: 'category_id',
            timestamps: true
        })
    }

    return Category
};