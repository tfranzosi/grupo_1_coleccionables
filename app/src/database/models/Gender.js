module.exports = (sequelize, dataTypes) => {
    let alias = 'Gender';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        gender: {
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
    const Gender = sequelize.define(alias, cols, config);

    Gender.associate = function(models) {
        Gender.hasMany(models.User, { // models.User -> User es el valor de alias en movie.js
            as: "users_gender", // El nombre del modelo pero en plural
            foreignKey: "gender"
        })
    }

    return Gender
};