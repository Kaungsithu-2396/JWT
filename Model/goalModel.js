const mongoose = require("mongoose");
const goalSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
        text: {
            type: String,
            required: [true, "please fill the text "],
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Goal", goalSchema);
