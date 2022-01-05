const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
  if (!emailRegex.test(email)) throw "Email is not supported from your domain";

  const userExist = await User.findOne({
    email: email,
  });

  if (userExist) throw "User already exist!";

  if (password.length < 6) throw "Password must be atleast 6 characters long.";
  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });
  await user.save();
  res.status(201).json({
    status: 201,
    message: `User ${name} registered successfully!`,
    user: user,
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email: email,
    password: sha256(password + process.env.SALT),
  });
  const token = await jwt.sign({ id: user.id }, process.env.SECRET);
  res.status(200).json({
    status: 200,
    message: "User logged in successfully!",
    token: token,
  });
};
