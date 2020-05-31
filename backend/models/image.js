const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Image = sequelize.define("image", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  imageName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  downloads: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Image;
