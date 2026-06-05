const express = require("express");
const User = require("../models/user");
const Profile = require("../models/profile");
const Skill = require("../models/skills");

const apiRouter = express.Router();

apiRouter.get("/user", (req,res) => {
    const user = req.user;
    return res.json({
        _id: user._id,
        fullname: user.fullname,
        gender: user.gender,
        age: user.age,
        profileImageURL: user.profileImageURL,
        age: user.age,
        role: user.role,
    });
})

apiRouter.get("/profile",async (req,res) => {
    const user = req.user;
    const profile = await Profile.findOne({createdBy: user._id});
    return res.json(profile);
})

module.exports = apiRouter