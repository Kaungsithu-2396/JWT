const asyncHandler = require("express-async-handler");
// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, resp) => {
    resp.status(200).json({
        message: "Get goals",
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
    resp.status(201).json({
        message: "Add goals",
        data: req.body,
    });
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    resp.status(200).json({
        message: `update goal ${id}`,
    });
});
// @desc Delete Goals
// @route delete /api/goals/:i
// @access Private
const deleteGoal = asyncHandler(async (req, resp) => {
    const { id } = req.params;
    resp.status(200).json({
        message: `delete goal ${id}`,
    });
});
module.exports = { getGoals, addGoal, updateGoal, deleteGoal };
