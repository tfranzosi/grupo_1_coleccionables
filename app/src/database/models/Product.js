module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        sku: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        product_name: {
            type: dataTypes.STRING(240),
            allowNull: false
        },
        short_description: {
            type: dataTypes.TEXT,
        },
        long_description: {
            type: dataTypes.TEXT,
        },
        regular_price: {
            type: dataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false
        },
        discount: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
        },
        fee_q: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
        },
        tags: {
            type: dataTypes.STRING(200),
            defaultValue: null,
        },
        is_offer: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        is_physical: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        },
        image_url: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        visits_q: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false
        },
        sales_q: {
            type: dataTypes.MEDIUMINT.UNSIGNED,
            allowNull: false
        },
        best_seller: {
            type: dataTypes.TINYINT(1),
            allowNull: false
        }
    };
    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {

        Product.belongsToMany(models.Option, { // models.Option -> Option es el valor de alias en actor.js
            as: 'options',
            through: 'products_options',
            foreignKey: 'product_id',
            otherKey: 'option_id',
            timestamps: true
        }),
        Product.belongsToMany(models.Category, { // models.Category -> Category es el valor de alias en actor.js
            as: 'categories',
            through: 'products_categories',
            foreignKey: 'product_id',
            otherKey: 'category_id',
            timestamps: true
        }),
        Product.belongsToMany(models.Order, { // models.Order -> Order es el valor de alias en actor.js
            as: 'orders',
            through: 'order_details',
            foreignKey: 'product_id',
            otherKey: 'order_id',
            timestamps: true
        }),
        Product.belongsToMany(models.User, { // models.User -> User es el valor de alias en actor.js
            as: 'users',
            through: 'users_visited_products',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: true
        })
    }

    return Product
};