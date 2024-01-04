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
        throw new Error("Please fill all the required field");
    }
    const isUserExisit = await User.findOne({ email });
    if (isUserExisit) {
        resp.status(400);
        throw new Error("User already exisits");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashPassword });
    resp.status(201).send({
        message: "success",
        data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser.id),
        },
    });
});
//@desc Authenticate User
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400);
        throw new Error("please fill the required fields to authenticate");
    }
    const isExisitingUser = await User.findOne({ email });
    if (
        isExisitingUser &&
        (await bcrypt.compare(password, isExisitingUser.password))
    ) {
        resp.status(201).send({
            message: "authenticated",
            data: isExisitingUser,
            token: generateToken(isExisitingUser.id),
        });
    } else {
        resp.status(401);
        throw new Error("Invalid user");
    }
});
//@desc Get Current Login User Data
//@route GET /api/users/me
//@access Private
const getCurrentUser = asyncHandler(async (req, resp) => {
    resp.send({
        message: req.user,
    });
});
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
    });
};
module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
