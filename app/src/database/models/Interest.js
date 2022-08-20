const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'Interest';
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
        tableName:'interests',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Interest = sequelize.define(alias, cols, config); 

    Interest.associate = function (models) {
        Interest.belongsToMany(models.User, { // models.User -> User es el valor de alias en movie.js
            as: 'users_interest',
            through: 'user_interests',
            foreignKey: 'user_id',
            otherKey: 'interest_id',
            timestamps: true
        })
    }

    return Interest
};