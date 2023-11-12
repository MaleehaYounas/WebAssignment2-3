const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    authorID:String,
    authorName: String,
    title:String,
    description:String,
    attachedFiles:[String],
    comments:[{writer: String, comment: String}]
},{timestamps:true})
const model = mongoose.model("Blog" , blogSchema);
module.exports = model;

