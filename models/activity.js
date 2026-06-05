const {Schema,model} = require("mongoose");

const activitySchema = new Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session"
  },

  type: {
    type: String,
    enum: ["task_assigned", "task_submitted", "feedback_given"]
  },

  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  metadata: Object

}, { timestamps: true });

const Activity = model("activity", activitySchema);

module.exports = Activity;