const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    getAll: async () => await db.UserInterest.findAll(),
    

    getUserInterestsById: async (id) => {
        let interests = await db.UserInterest.findAll({
            where: {
                user_id: id
            },
            raw: true
        })
        interests = interests.map(interest => interest.interest_id)
        return interests;
    }
        ,

    create: async (user) => {
        let interests = user.interests.map(interest => {
            return {
                user_id: user.id,
                interest_id: interest
            }
        });
        await db.UserInterest.bulkCreate(interests);
    },

    delete: async (id) => await db.UserInterest.destroy({
            where: {
                user_id: id
            }
        })
}