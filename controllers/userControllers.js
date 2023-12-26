const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const asyncHandler = require("express-async-handler");
//@desc RegisterUser
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, resp) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        resp.status(400);
        throw new Error("please fill all the required fields");
    }
    //check exisiting user
    const isExisitingUser = await User.findOne({ email });
    if (isExisitingUser) {
        resp.status(400);
        throw new Error(`User already exisits with ${email} `);
    }
    //hash password for the sake of confedentiality
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
    });
    console.log(newUser.id);
    resp.status(200).send({
        message: "user registration success",
        data: {
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        },
    });
});
//@desc Authenticate User
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    const verityUser = await User.findOne({ email });

    if (!email || !password) {
        resp.status(500);
        throw new Error("please fill text to authenticate");
    }

    if (verityUser && (await bcrypt.compare(password, verityUser.password))) {
        resp.status(201).send({
            verityUser,
        });
    } else {
        resp.status(400).send({
            message: "Invalidate user",
        });
    }

    //    if(verityUser && await bcrypt.compare(password,verityUser.password))
});
//@desc Get Current Login User Data
//@route GET /api/users/me
//@access Private
const getCurrentUser = asyncHandler(async (req, resp) => {
    resp.send({
        message: "current user data",
    });
});
module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
