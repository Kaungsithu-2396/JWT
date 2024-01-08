const goalModel = require("../Model/goalModel");
const asyncHandler = require("express-async-handler");
const userModel = require("../Model/userModel");
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, resp) => {
    const goals = await goalModel.find({ user: req.user.id });
    resp.status(200).json({
        count: goals.length,
        message: "Get goals",
        data: goals,
    });
});

// @desc Add Goals
// @route POST /api/goals
// @access Private
const addGoal = asyncHandler(async (req, resp) => {
    if (!req.body.text) {
        resp.status(400);
        throw new Error("Please fill the text");
    }
    const goal = await goalModel.create({
        text: req.body.text,
        user: req.user.id,
    });
    resp.status(201).json({
        count: goal.length,
        data: goal,
    });
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    const goal = await goalModel.findById(id);
    if (!goal) {
        resp.status(400);
        throw new Error("No data found");
    }
    const user = await userModel.findById(req.user.id);
    if (!user) {
        resp.status(401);
        throw new Error("no user found");
    }
    if (goal.user.toString() !== user.id) {
        resp.status(401);
        throw new Error("Unauthorized user");
    }
    const updateGoal = await goalModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    resp.status(200).json({
        message: "success",
        data: updateGoal,
    });
});
// @desc Delete Goals
// @route delete /api/goals/:i
// @access Private
const deleteGoal = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    const delGoal = await goalModel.findById(id);
    if (!delGoal) {
        resp.status(400);
        throw new Error("No text found");
    }
    const user = await userModel.findById(req.user.id);
    if (!user) {
        resp.status(401);
        throw new Error("no user found");
    }
    if (delGoal.user.toString() !== user.id) {
        resp.status(401);
        throw new Error("unauthorized user");
    }
    await goalModel.findByIdAndDelete(id);

    resp.status(200).json({
        message: `delete goal ${id}`,
    });
});
module.exports = { getGoals, addGoal, updateGoal, deleteGoal };
