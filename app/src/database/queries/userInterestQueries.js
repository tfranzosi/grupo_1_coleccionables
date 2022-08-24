const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    getAll: async () => db.Interests.findAll(),

    create: async (user) => {
        let interests = user.interests.map(interest => {
            return {
                user_id: user.id,
                interest_id: interest
            }
        });
        await db.UserInterest.bulkCreate(interests);
    },

    delete: async (user) => {
        await db.UserInterest.destroy({
            where: {
                user_id: user.id
            }
        })
    }

}