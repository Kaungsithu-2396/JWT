const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: "String",
            required: [true, "please fill the name"],
        },
        email: {
            type: String,
            required: [true, "Email must be filled"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password must be filled"],
        },
    },
    {
        timestamps: true,
    }
);
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
