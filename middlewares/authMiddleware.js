const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const routeProtector = asyncHandler(async (req, resp, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decode.id).select("-password");
        } catch (error) {
            resp.status(401);
            throw new Error("token invalid");
        }
    } else {
        resp.status(401);
        throw new Error("No token found");
    }
    next();
});
module.exports = routeProtector;
