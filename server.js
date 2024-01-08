const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "../.env" });
//router collection
const goal_routes = require("./routes/goalRoutes");
const userRoutes = require("./routes/userRoutes");
//router collection

const port = process.env.PORT || 3000;
const errorHandler = require("../backend/middlewares/errorHandlerMiddleware");
const connectDB = require("../backend/controllers/config/db_conn");
//db connection
connectDB();
//initialize express
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/goals", goal_routes);
app.use("/api/users", userRoutes);

app.use(errorHandler);
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
