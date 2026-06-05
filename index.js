require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;

const {connectMongoDB} = require("./connections/database");
const Path = require("path");
const cookieParser = require("cookie-parser");
const {checkAuth} = require("./middlewares/auth");
const userRouter = require("./routes/user")
const apiRouter = require("./routes/api")
connectMongoDB(process.env.MONGODB_URL);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkAuth());

app.use("/user", userRouter);

app.use("/api", apiRouter);

app.set("view engine","ejs")
app.set("views", Path.resolve("./views"));

app.listen(PORT, () => {
    console.log("Server Started");
});