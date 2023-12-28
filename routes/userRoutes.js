const express = require("express");
const userRoutes = express.Router();
const {
    registerUser,
    loginUser,
    getCurrentUser,
} = require("../controllers/userControllers");
const routerProtecter = require("../middlewares/authMiddleware");
userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.get("/me", routerProtecter, getCurrentUser);

module.exports = userRoutes;
