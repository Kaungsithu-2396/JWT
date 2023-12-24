const mongoose = require("mongoose");
const goalSchema = new mongoose.Schema(
    {
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
