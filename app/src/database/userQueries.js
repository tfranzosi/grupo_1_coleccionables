const db = require('./models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    search: async (query,limit,page) => await db.User.findAll({
        where: {
            // [Op.or]: [
            //     {first_name: { [Op.like]: '%' + query + '%' }},
            //     {last_name: { [Op.like]: '%' + query + '%' }},
            //     {user: { [Op.like]: '%' + query + '%' }},
            //     {email: { [Op.like]: '%' + query + '%' }}
            // ]
        },
        limit,
        offset: limit * page
    }),

    findById: async (id) => await db.User.findByPk(id,{
        include: [
            { association: 'interests' },
            { association: 'genders' }
        ] 
    }),

    searchCount: async (query) => await db.User.count({
        where: {
            [Op.or]: [
                {first_name: { [Op.like]: '%' + query + '%' }},
                {last_name: { [Op.like]: '%' + query + '%' }},
                {user: { [Op.like]: '%' + query + '%' }},
                {email: { [Op.like]: '%' + query + '%' }}

            ]
        }
    }),

    findByUser: async (user) => await db.User.findOne({
        where: {
            [Op.or]: [
                {user: user},
                {email: user}
            ]
        },
        include: [
            { association: 'interests' },
            { association: 'genders' }
        ] 
    }),
    
    create: async (user) => {
        let newCustomer = await db.User.create(user);

        let interests = user.interests.map(interest => {
            return {
                user_id: newCustomer.id,
                interest_id: interest
            }
            
        });
        await db.UserInterest.bulkCreate(interests);
    },

    delete: async (id) => await db.User.destroy({
        where: {
            id: id
        }
    }),
    
    obtainInterests: async () => await db.Interest.findAll()


}