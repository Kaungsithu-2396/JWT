const goalModel = require("../Model/goalModel");
const asyncHandler = require("express-async-handler");
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, resp) => {
    const goals = await goalModel.find();
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
    const goal = await goalModel.create({ text: req.body.text });
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
    const goal = await goalModel.findByIdAndUpdate(
        id,
        { text: req.body.text },
        { new: true }
    );
    if (!goal) {
        resp.status(400);
        throw new Error("No data found");
    }
    resp.status(200).json({
        message: "success",
        data: goal,
    });
});
// @desc Delete Goals
// @route delete /api/goals/:i
// @access Private
const deleteGoal = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    const delGoal = await goalModel.findByIdAndDelete(id);
    if (!delGoal) {
        resp.status(400);
        throw new Error("wrong ");
    }

    resp.status(200).json({
        message: `delete goal ${id}`,
    });
});
module.exports = { getGoals, addGoal, updateGoal, deleteGoal };
