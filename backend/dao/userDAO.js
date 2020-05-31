const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.saveUser = async (req, res, next) => {
  console.log("userDAo");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.user;
  const pass = await bcrypt.hash(password, 10);
  User.create({
    name: name,
    email: email,
    userType: userType,
    password: pass,
  })
    .then((result) => {
      //   console.log(result);
      res.status(200).json({
        message: "user saved",
        user: result,
      });
    })
    .catch((err) => {
      //   console.log(err);
      res.status(401).json({
        message: "user not saved",
        status: false,
      });
    });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  try {
    const fatchedUser = await User.findAll({ where: { email: email } });
    // console.log("########################## ", fatchedUser[0].id);
    if (!fatchedUser) {
      res.status(404).json({
        messege: "user is not registered",
      });
    }

    const result = await bcrypt.compare(password, fatchedUser[0].password);

    if (!result) {
      res.status(404).json({
        messege: "auth failed",
      });
    }
    const token = jwt.sign(
      {
        email: fatchedUser[0].email,
        userId: fatchedUser[0].id,
        userName: fatchedUser[0].name,
      },
      "secert_this_should_be_longer",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fatchedUser[0].id,
      user: fatchedUser[0].userType,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      messege: "auth failed",
    });
  }
};
