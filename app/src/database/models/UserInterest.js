const { Op } = require("sequelize");

module.exports = (sequelize, dataTypes) => {
    let alias = 'UserInterest';
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
        interest_id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        }
    };

    let config = {
        tableName: 'users_interests',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const UserInterest = sequelize.define(alias, cols, config);
    
    UserInterest.associate = function(models) {
        // Vinculacion M:1 con users
        UserInterest.belongsTo(models.User, {
            foreignKey: "user_id"
        }),
        // Vinculacion M:1 con interests
        UserInterest.belongsTo(models.Interest, {
            foreignKey: "interest_id"
        })
    }

    return UserInterest
};