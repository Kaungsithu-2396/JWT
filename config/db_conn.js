const mongoose = require("mongoose");
const colors = require("@colors/colors");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`connection success on host ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectDB;
