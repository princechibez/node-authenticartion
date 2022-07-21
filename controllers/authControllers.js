const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv/config");

const User = require("../models/users");
const jwtSecret = process.env.JWT_SECRET;

exports.postSignup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const roles = req.body.roles;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error(errors.array()[0].msg);
      error.httpStatusCode = 400;
      throw error;
    }
    let salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
    let hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      throw new Error("Hashing password failed");
    }
    const user = new User({
      username: name,
      email: email,
      password: hashedPassword,
      roles: roles
    });
    await user.save();

    return res
      .status(201)
      .json({ user: user, message: "User created successfully" });
  } catch (err) {
    err.httpStatusCode = err.httpStatusCode || 500;
    next(err);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error(errors.array()[0].msg);
      errors.httpStatusCode = 401;
      throw error;
    }
    const user = await User.findOne({ email: email });
    const token = jwt.sign({ user: user._doc }, jwtSecret, { expiresIn: "10m" });
    return res.status(200).json({ user: user, token, message: "Login Successfull..." })
  } catch (err) {
    err.httpStatusCode = err.httpStatusCode || 500;
    next(err);
  }
};

exports.postLogout = (req, res, next) => { 
  return delete req.userId // This removes the userId from the request object
};

exports.passwordRecovery = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found!");
    let salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
    let hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save()
    return res.status(201).json("Password updated successfully...")
  }   catch (err) {
        next(err)
      }
}