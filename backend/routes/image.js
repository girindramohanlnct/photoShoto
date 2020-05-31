const route = require("express").Router();
const imageDAO = require("../dao/imageDAO");
const isAuth = require("../middleware/check-auth");

route.post("/save", isAuth, imageDAO.saveImage);
route.get("", isAuth, imageDAO.getImages);
route.get("/:id", isAuth, imageDAO.getImage);
route.get("/search/:cat", isAuth, imageDAO.search);
route.get("/byUser/:id", isAuth, imageDAO.getImagesByUser);

module.exports = route;
