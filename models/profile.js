const {Schema, model} = require("mongoose")

const profileSchema = new Schema({ 
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    bio: {
        type: String,
    },
    skills: {
        type: String,
    },
    location: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    rating: {
        type: Number,
    },
}, {timestamps: true});

const Profile = model("profile", profileSchema);

module.exports = Profile; 