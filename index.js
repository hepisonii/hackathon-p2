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

app.set("view engine","ejs")
app.set("views", Path.resolve("./views"));

app.use("/user", userRouter);
app.use("/api", apiRouter);
app.use("/mentor/profile", mentorRouter);

app.get("/", (req,res) => {
    const user = req.user;
    if(!user)
        return res.redirect("/user/login");
    return res.sendFile(Path.resolve(__dirname, "./views/home.html"));
});

app.get("/about", (req,res) => {
    return res.sendFile(Path.resolve(__dirname, "./views/about_us.html"));
})

app.listen(PORT, () => {
    console.log("Server Started");
});