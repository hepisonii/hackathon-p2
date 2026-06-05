const mongoose = require("mongoose");

const sessionRequestSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  category: String,
  skill: String,

  message: String,

  currentProposedTime: {
    type: Date,
    required: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "mentor_proposed",
      "accepted",
      "rejected",
      "expired"
    ],
    default: "pending"
  },

  // 🔒 Slot locking
  lockStatus: {
    type: String,
    enum: ["none", "temporary", "confirmed"],
    default: "none"
  },

  paymentDeadline: Date,

  finalized: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

sessionRequestSchema.index({ mentor: 1, status: 1 });

module.exports = mongoose.model("SessionRequest", sessionRequestSchema);