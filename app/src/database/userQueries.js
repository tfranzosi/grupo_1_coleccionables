const db = require('./models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {
    findAll: db.User.findAll(),

    findById: (id) =>  db.User.findByPk(id,{
        include: [
            { association: 'interests' },
            { association: 'genders' }
        ] 
    }),
    findByUser: (user) => db.User.findOne({
        where: {
            'user': user
        },
        include: [
            { association: 'interests' },
            { association: 'genders' }
        ] 
    })
    


}