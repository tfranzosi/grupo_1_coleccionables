const db = require('./models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    findAll: async () => await db.User.findAll(),

    findById: async (id) => await db.User.findByPk(id,{
        include: [
            { association: 'interests' },
            { association: 'genders' }
        ] 
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
    
    create: async (product) => await db.user.create(product),

    delete: async (id) => await db.User.destroy({
        where: {
            id: id
        }
    })
    


}