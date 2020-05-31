const Sequelize = require("sequelize");

sequelize = new Sequelize("photo", "root", "mohan", { dialect: "mysql" });

module.exports = sequelize;
