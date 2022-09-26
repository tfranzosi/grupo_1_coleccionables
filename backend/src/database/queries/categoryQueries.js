const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    getAll: async () => await db.Category.findAll(),
    
    countProductByCategory: async () => {
        let categoryCount = {};
        const categories = await db.Category.findAll();

        for (let category of categories){
            const count = await db.ProductCategory.count({
                where: {
                    category_id: category.id
                }
            });
            categoryCount[category.name] = count;
        }
        
        return categoryCount;
    }

}