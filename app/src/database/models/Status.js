module.exports = (sequelize, dataTypes) => {
    let alias = 'Status';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName:'orders_status',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Status = sequelize.define(alias, cols, config);

    Status.associate = function(models) {
        Status.hasMany(models.Order, { // models.Order -> Order es el valor de alias en movie.js
            as: "orders_status", // El nombre del modelo pero en plural
            foreignKey: "status_id"
        })
    }

    return Status
};