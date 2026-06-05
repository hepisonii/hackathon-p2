// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SessionRequest"
  },

  scheduledTime: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming"
  },

  meetingLink: String,

  isPaid: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model("Session", sessionSchema);