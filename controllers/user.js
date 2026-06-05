const express = require("express");
const User = require("../models/user");
const Profile = require("../models/profile");
const fs = require("fs");
const Path = require("path")
const {cloudinary, upload} = require("../cloudConfig")
async function handleGetUserSignUp(req,res){
    return res.render("signup");
}

async function handlePostUserSignUp(req,res){
    const {fullname,email,username,password,age,gender,role} = req.body;
    console.log("Body Signup: ", req.body);
    const entry = await User.findOne({username});
    if(entry){
        return res.render("signup", {
            error: "Username already exists"
        })
    }
    let imageUrl = null;

if (req.file) {
    const photo = await cloudinary.uploader.upload(req.file.path, {
        folder: "hackathon-p2",
    });
    fs.unlinkSync(req.file.path);
    imageUrl = photo.secure_url;
    profileImageId = photo.public_id;
}
    const user = await User.create({
        fullname,
        username,
        email,
        password,
        role,
        age,
        gender,
        profileImageURL: imageUrl,
        profileImageId
    });
    if(role === "mentor"){
        await Profile.create({
            createdBy: user._id
        });
    }
    return res.redirect("/about");
}

async function handleGetUserLogin(req,res){
    return res.render("login");
}

async function handlePostUserLogin(req,res){
    const {username,password} = req.body;
    console.log("Body", req.body);
    const token = await User.matchPassword(username,password)
     if(!token){
        return res.render("login", {
            error: "Invalid username or password"
        });
    }
    else{
    res.cookie("uid", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.redirect("/");
    }
}

async function handleGetUserLogout(req,res){
    res.clearCookie("uid", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.redirect("/user/login");
}

async function handleGetProfile(req,res){
    return res.sendFile(Path.resolve(__dirname, "../views/profile.html"))
}

async function handlePatchProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);

    // 🔐 Allowed fields
    const allowedFields = ["fullname","username", "email", "gender", "age"];
    console.log("Body: ",req.body);
    // 🔄 Update body fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    // 🖼️ Image update
    if (req.file) {
      // 1️⃣ Upload new image
      const result = await cloudinary.uploader.upload(req.file.path);

      // 2️⃣ Delete old image
      if (user.profilePhotoId) {
        await cloudinary.uploader.destroy(user.profilePhotoId);
      }

      // 3️⃣ Save new values
      user.profileImageURL = result.secure_url;
      user.profilePhotoId = result.public_id;
    }

    await user.save();

    res.json({
      success: true,
      data: user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
}
module.exports = {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin,
    handleGetUserLogout,
    handleGetProfile,
    handlePatchProfile
}