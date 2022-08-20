const db = require('./models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    find: (id) =>  db.User.findByPk(id),
    findByUser: (user) => db.User.findOne({
        where: {
            'user': user
        }
    })
    


}