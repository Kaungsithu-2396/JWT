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
        throw new Error("Please fill the required field");
    }
    const isExisitingUser = await User.findOne({ email });
    //hash password so that no security risk occur
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashPassword });
    if (isExisitingUser) {
        resp.status(400);
        throw new Error("user already exisits");
    } else {
        resp.status(201).send({
            message: "user registration success",
            authenticate: true,
            user: newUser,
            token: generateToken(newUser.id),
        });
    }
});
//@desc Authenticate User
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, resp) => {
    const { email, password } = req.body;
    if (!email || !password) {
        resp.status(400);
        throw new Error("Please fill the required data to authenticate");
    }
    const isUserExisit = await User.findOne({ email });
    if (
        isUserExisit &&
        (await bcrypt.compare(password, isUserExisit.password))
    ) {
        resp.status(201).send({
            authenticate: true,
            data: isUserExisit,
            token: generateToken(isUserExisit.id),
        });
    } else {
        resp.status(400);
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
        expiresIn: "3d",
    });
};
module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
