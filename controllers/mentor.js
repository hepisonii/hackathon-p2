const express = require("express");
const User = require("../models/user");
const Profile = require("../models/profile");
const Path = require("path");

async function handleGetMentor(req,res){
    return res.sendFile(Path.resolve("../views/mentorProfile.html"));    
}

async function handlePatchMentor(req,res){
    
}

async function handleGetMentorProfileView(req,res){

}

module.exports = {
    handleGetMentor,
    handlePatchMentor,
    handleGetMentorProfileView
}