const express = require("express");
const userRoutes = express.Router();
const {
    registerUser,
    loginUser,
    getCurrentUser,
} = require("../controllers/userControllers");
const routeProtector = require("../middlewares/authMiddleware");
userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.get("/me", routeProtector, getCurrentUser);

module.exports = userRoutes;
