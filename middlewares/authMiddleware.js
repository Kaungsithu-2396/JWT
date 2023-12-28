const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");
const routerProtecter = asyncHandler(async (req, resp, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //access token from request
            token = req.headers.authorization.split(" ")[1];
            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decode.id).select("-password");
            next();
        } catch (error) {
            resp.status(401);
            throw new Error("Unauthorized Access");
        }
    }
    if (!token) {
        resp.status(401);
        throw new Error("No token found");
    }
});
module.exports = routerProtecter;
