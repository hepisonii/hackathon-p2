// models/Chat.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SessionRequest"
  }

}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);