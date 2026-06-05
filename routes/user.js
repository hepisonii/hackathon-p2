const express = require("express");
const userRouter = express.Router();
const {upload} = require("../cloudConfig")
const {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin,
    handleGetUserLogout,
    handlePostStartInterview
} = require("../controllers/user");
const { limiter } = require("../middlewares/auth");



userRouter.get("/signup",handleGetUserSignUp);
userRouter.post("/signup",upload.single("photo"), handlePostUserSignUp);
userRouter.get("/login", handleGetUserLogin);
userRouter.post("/login",limiter, handlePostUserLogin);
userRouter.get("/logout", handleGetUserLogout);

module.exports = userRouter;