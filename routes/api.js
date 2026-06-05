const express = require("express");
const User = require("../models/user");
const Profile = require("../models/profile");

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


apiRouter.get("/mentor/profile", async (req,res) => {
    const user = req.user;
    const profile = await Profile.findOne({createdBy: user._id});
    return res.json(profile);
});

apiRouter.get("/mentors", async (req,res) => {
    try{
    const { category, skill, sort } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (skill) {
      // skills is array → use $in
      filter.skills = { $in: [skill] };
    }
    
    let sortOption = {};

    if (sort === "rating") {
      sortOption.rating = -1; // highest first
    } else if (sort === "price_low") {
      sortOption.hourlyRate = 1;
    } else if (sort === "price_high") {
      sortOption.hourlyRate = -1;
    }

    const mentors = await Profile.find(filter)
      .populate("createdBy", "fullname profileImageURL")
      .sort(sortOption);

    res.status(200).json({
      success: true,
      count: mentors.length,
      data: mentors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = apiRouter