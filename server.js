const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const Image = require("./backend/models/image");
const User = require("./backend/models/user");

const userRoutes = require("./backend/routes/user");
const imageRoutes = require("./backend/routes/image");

const path = require("path");
const sequelize = require("./backend/utils/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

Image.belongsTo(User, { constraints: true });
User.hasMany(Image);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
    console.log("Connected to Mysql");
  })
  .catch((err) => {
    console.log(err);
  });

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {

    const a = file.originalname.split(".");
    let n = a.slice(0, a.length - 1);
    n = n.join(".");
    const name = n.toLowerCase().split(" ").join("-");
    console.log(n);
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

app.use(multer({ storage: fileStorage }).single("imageURL"));

app.use("/user", userRoutes);
app.use("/image", imageRoutes);

module.exports = app;
