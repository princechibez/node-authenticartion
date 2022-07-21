const express = require("express");
const { body } = require("express-validator");
const bcrypt = require("bcrypt");

const isAuth = require("../middleware/authMiddleware")
const User = require("../models/users");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", [
    body("name", "Provide your name please, field must not be empty.")
    .trim()
    .not()
    .isEmpty(),
    body("password", "Password must be greater than 8 and less than 12 characters!")
    .isLength({min: 8, max: 12})
    .not().isEmpty(),
    body("email", "invalid email address").isEmail().normalizeEmail().not().isEmpty()
    .custom(async (value, { req }) => {
        let user = await User.findOne({email: value});
        if (user) throw Error("This email address already exists, choose another one")
        return true
    })
], authControllers.postSignup)

router.post("/login", [
    body("email", "Invalid email address")
    .isEmail().not().isEmpty()
    .custom( async (value, { req }) => {
        let user = await User.findOne({ email: value });
        if (!user) {
            throw new Error("No user with this email address was found!")
        }
        return true
    }),
    body("password", "Password field must not be empty!")
    .not().isEmpty()
    .custom( async (value, { req }) => {
        let user = await User.findOne({ email: req.body.email });
        let matchedPassword = await bcrypt.compare(value, user.password);
        if (!matchedPassword) throw new Error("Incorrect password")
        return true
    })
], authControllers.postLogin)

router.post("/forgotPassword", authControllers.passwordRecovery)

module.exports = router;