const express = require("express");
const goal_router = express.Router();
const {
    getGoals,
    deleteGoal,
    updateGoal,
    addGoal,
} = require("../controllers/goalControllers");
const routeProtector = require("../middlewares/authMiddleware");

goal_router
    .route("/")
    .get(routeProtector, getGoals)
    .post(routeProtector, addGoal);
goal_router
    .route("/:id")
    .put(routeProtector, updateGoal)
    .delete(routeProtector,deleteGoal);

module.exports = goal_router;
