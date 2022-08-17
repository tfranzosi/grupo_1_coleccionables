const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Option';
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
        tableName: 'options',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Option = sequelize.define(alias, cols, config); 

    Option.associate = function (models) {
        Option.belongsToMany(models.Product, { // models.Product -> Product es el valor de alias en movie.js
            as: 'product_options',
            through: 'products_options',
            foreignKey: 'product_id',
            otherKey: 'option_id',
            timestamps: true
        })
    }

    return Option
};