const express = require("express");
const User = require("../models/user");
const Profile = require("../models/profile");
const Path = require("path");

async function handleGetMentorProfile(req,res){
    return res.sendFile(Path.resolve("../views/mentorProfile.html"));    
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