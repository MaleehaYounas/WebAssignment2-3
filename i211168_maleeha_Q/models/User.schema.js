const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    FullName :String,
    email:String,
    role:String,
    Password:String,
    profileImage:String,
    isBlocked: { type: Boolean, default: false }
},{timestamps:true})
const model = mongoose.model("User" , userSchema);
module.exports = model;

