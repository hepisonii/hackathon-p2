const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session"
  },

  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  amount: {
    type: Number,
    required: true
  },

  platformFee: Number,
  mentorAmount: Number,

  status: {
    type: String,
    enum: ["pending", "held", "released", "refunded"],
    default: "pending"
  },

  paidAt: Date,
  releasedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);