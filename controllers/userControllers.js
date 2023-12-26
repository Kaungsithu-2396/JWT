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
        throw new Error("Please fill the required text field");
    }
    const isExisitingUser = await User.findOne({ email });
    if (isExisitingUser) {
        resp.status(400);
        throw new Error("User already exisits");
    }
    //hash Password since it's confedential
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ name, email, password: hashPassword });
    resp.status(201).send({
        message: "user create success",
        data: {
            _id: newUser.id,
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
        throw new Error(
            "Please fill the required data for authentication process"
        );
    }
    const findUser = await User.findOne({ email });
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
        resp.status(201).send({
            message: "Authenticated user",
            data: {
                _id: findUser.id,
                name: findUser.name,
                email: findUser.email,
                token: generateToken(findUser.id),
            },
        });
    } else {
        resp.status(400).send({
            message: "Invalid User",
        });
    }
});
//@desc Get Current Login User Data
//@route GET /api/users/me
//@access Private
const getCurrentUser = asyncHandler(async (req, resp) => {
    resp.send({
        message: "current user data",
    });
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10d",
    });
};
module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
};
