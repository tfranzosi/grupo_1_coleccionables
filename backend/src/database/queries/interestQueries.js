const db = require('../models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

module.exports = {

    getAll: async () => await db.Interest.findAll()

}