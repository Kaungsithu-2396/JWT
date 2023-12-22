const express = require("express");
const goal_router = express.Router();
const {
    getGoals,
    deleteGoal,
    updateGoal,
    addGoal,
} = require("../controllers/goalControllers");


goal_router.route("/").get(getGoals).post(addGoal);
goal_router.route("/:id").put(updateGoal).delete(deleteGoal);


module.exports = goal_router;
