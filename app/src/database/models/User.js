module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        user: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        phone_country: {
            type: dataTypes.STRING(5)
        },
        phone_number: {
            type: dataTypes.STRING(20)
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
        address: {
            type: dataTypes.STRING(50),
            defaultValue: null
        },
        gender: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        image_url: {
            type: dataTypes.STRING(200),
            defaultValue: null
        },
        last_visit_date: {
            type: dataTypes.DATEONLY,
            defaultValue: null
        },
        user_role_id: {
            type:dataTypes.BIGINT(10),
            allowNull: false
        }
        
    };
    let config = {
        tableName: 'users',
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
            through: 'users_interests',
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