const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    search: async (query,limit,page) => await db.User.findAll({
        include: [
            { association: 'interests' },
            { association: 'genders' },
            { association: 'roles' }
        ],
        limit,
        offset: limit * page
    }),

    findById: async (id) => await db.User.findByPk(id,{
        include: [
            { association: 'interests' },
            { association: 'genders' },
            { association: 'roles' }
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
            { association: 'genders' },
            { association: 'roles' }
        ] 
    }),
    
    create: async (user) => await db.User.create(user),

    update: async (user) => await db.User.update(user,{
        where: {
            id: user.id
        }
    }),

    delete: async (id) => await db.User.destroy({
        where: {
            id: id
        }
    }),
    
    getInterests: async () => await db.Interest.findAll(),

    getGenders: async () => await db.Gender.findAll()

}