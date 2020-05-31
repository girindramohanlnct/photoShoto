const route = require("express").Router();
const userDAO = require("../dao/userDAO");

route.post("/signin", userDAO.saveUser);

route.post("/login", userDAO.login);

module.exports = route;
