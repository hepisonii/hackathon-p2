const express = require("express");
const User = require("../models/user");
const {cloudinary,upload} = require("../cloudConfig")
const fs = require("fs");
const Path = require("path")

async function handleGetUserSignUp(req,res){
    return res.render("signup");
}

async function handlePostUserSignUp(req,res){
    const {fullname,username,password,age,gender, qualifications,role} = req.body;
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
    return res.redirect("/user/login");
}


async function handleGetUserLogin(req,res){
    return res.render("login");
}

async function handlePostUserLogin(req,res){
    const {username,password} = req.body;
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
    return res.sendFile(Path.resolve(__dirname, "../views/profile.html"));
}

async function handlePostProfile(req,res){
    
}

module.exports = {
    handleGetUserSignUp,
    handlePostUserSignUp,
    handleGetUserLogin,
    handlePostUserLogin,
    handleGetUserLogout,
    handleGetProfile,
    handlePostProfile
}