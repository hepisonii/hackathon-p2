const express = require("express");
const mentorRouter = express.Router();
const {checkRole} = require("../middlewares/auth");
const {
    handleGetMentorProfile,
    handlePatchMentorProfile,
    handleGetMentorProfileView
} = require("handleGetMentorProfile");

mentorRouter.get("/", checkRole["mentor"], handleGetMentorProfile);
mentorRouter.patch("/", checkRole["mentor"], handlePatchMentorProfile);
mentorRouter.get("/:id", handleGetMentorProfileView);

module.exports = mentorRouter;