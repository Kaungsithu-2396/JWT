const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const goal_router = require("./routes/goalRoutes");
const port = process.env.PORT || 3000;
const errorHandler = require("../backend/middlewares/errorHandlerMiddleware");
const connectDB = require("./config/db_conn");
//db connection
connectDB();
//initialize express
const app = express();

app.use(express.json());
app.use("/api/goals", goal_router);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
