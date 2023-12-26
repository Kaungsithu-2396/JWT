const express = require("express");
const userRoutes = express.Router();
const {
    registerUser,
    loginUser,
    getCurrentUser,
} = require("../controllers/userControllers");

userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/me").get(getCurrentUser);

module.exports = userRoutes;
