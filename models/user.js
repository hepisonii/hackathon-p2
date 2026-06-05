const {Schema, model} = require("mongoose")
const {createHmac, randomBytes} = require("crypto");
const {setToken} = require("../services/auth")
const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
    },
    salt: {
        type: String,
    },
    profilePhotoId: {
        type: String,
    },
}, {timestamps: true});

userSchema.pre("save", async function (){
    console.log("Pre save hit");
    const user = this;
    if(!user.isModified("password")) return;
    const password = user.password;
    const salt = randomBytes(16).toString("hex");
    const hashed = createHmac("sha256", salt).update(password).digest("hex");
    user.password = hashed;
    user.salt = salt;
    console.log("Pre save done");
})

userSchema.static("matchPassword",async function (username,password){
    console.log("Point 1")
    const user = await this.findOne({username});
    if(!user) return false;
        console.log("Point 2")

    const salt = user.salt;
    const hashed = user.password;
    const providedHashed = createHmac("sha256", salt).update(password).digest("hex");
        console.log("Point 3")

    if(providedHashed === hashed){
    const token = setToken(user);
    return token;
    }

})

const User = model("user", userSchema);

module.exports = User;