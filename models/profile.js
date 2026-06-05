// models/MentorProfile.js
const mongoose = require("mongoose");

const mentorProfileSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    unique: true
  },

  bio: String,

  category: {
    type: String,
  },

  skills: [String],

  hourlyRate: {
    type: Number,
  },

  rating: {
    type: Number,
    default: 0
  },

  totalSessions: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

mentorProfileSchema.index({ category: 1, skills: 1 });

module.exports = mongoose.model("MentorProfile", mentorProfileSchema);