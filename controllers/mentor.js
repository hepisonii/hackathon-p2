const express = require("express");
const User = require("../models/user");
const Profile = require("../models/profile");
const Path = require("path");

async function handleGetMentorProfile(req,res){
    if(req.user.role !== "mentor"){
        return res.json({
            error: "Only mentors can access this route"
        });
    }
    return res.sendFile(Path.resolve("./views/portfolio.html"));    
}

async function handlePatchMentorProfile(req,res){
    
}

async function handleGetMentorProfileView(req,res){

}

module.exports = {
    handleGetMentorProfile,
    handlePatchMentorProfile,
    handleGetMentorProfileView
}