const {Schema, model} = require("mongoose");

const skillSchema = new Schema({
    category: {
        type: String,
    },
    skill: [{
        type: String,
    }],
    mentor: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
}, {timestamps: true});

const Skill = model("skill", skillSchema);

module.exports = Skill;