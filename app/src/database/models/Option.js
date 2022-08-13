const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Option';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        option_name: {
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
    const Option = sequelize.define(alias, cols, config); 

    Option.associate = function (models) {
        Option.belongsToMany(models.Product, { // models.Product -> Product es el valor de alias en movie.js
            as: 'products',
            through: 'product_options',
            foreignKey: 'product_id',
            otherKey: 'option_id',
            timestamps: false
        })
    }

    return Option
};