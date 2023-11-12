const User = require("../models/User.schema")
const Blog = require("../models/Blog.schema")
const blockUser = async (req, res) => {
    try {
        // Check if the user is  'admin'
        if ( req.role === "admin") {
            const { id } = req.params;

            // Check if the user exists
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ "Message": "User not found" });
            }

            // Disable the user
            user.isBlocked = true;
            await user.save();

            res.status(200).json({ "Message": "User blocked" });
        } else {
            res.status(403).json({ "Message": "You are not authorized for this action" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        
        if (req.role === "admin") {
            // Find all blogs in the system
            const blogs = await Blog.find();

            res.status(200).json(blogs);
        } else {
         
            res.status(403).json({ "Message": "You are not authorized for this action" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};




module.exports= {blockUser, getAllBlogs};

