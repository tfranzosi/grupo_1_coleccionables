module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_role_id: dataTypes.BIGINT(10),
        gender: dataTypes.BIGINT(10),
        first_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        user: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        phone_country: {
            type: dataTypes.BIGINT(2).UNSIGNED,
            allowNull: false
        },
        phone_number: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        birth_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        billing_address: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        image_url: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        last_visit_date: {
            type: dataTypes.DATEONLY,
            defaultValue: null
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
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Order, { // models.Order -> Order es el valor de alias en movie.js
            as: 'orders_user', // El nombre del modelo pero en plural
            foreignKey: 'user_id'
        })
        User.belongsToMany(models.Product, { // models.Product -> Product es el valor de alias en movie.js
            as: 'products_users',
            through: 'user_visited_products',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: true
        })
        User.belongsToMany(models.Interest, { // models.Interest -> Interest es el valor de alias en movie.js
            as: 'interests',
            through: 'user_interests',
            foreignKey: 'user_id',
            otherKey: 'interest_id',
            timestamps: true
        })
        User.belongsTo(models.Gender, { // models.Gender -> Gender es el valor de alias en genres.js
            as: 'genders',
            foreignKey: 'gender'
        })
        User.belongsTo(models.Role, { // models.Role -> Role es el valor de alias en genres.js
            as: "roles",
            foreignKey: 'user_role_id'
        })
    }

    return User
};