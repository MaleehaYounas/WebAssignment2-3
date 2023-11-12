
const blog = require("../models/Blog.schema")
const jwt = require("jsonwebtoken")



const CreateBlog = async (req, res) => {
   
    let data = req.body;

    let userId = req.userId;
    console.log(userId);
    const files = [];
    const attachedFiles = req.files ? (Array.isArray(req.files.attachedFiles) ? req.files.attachedFiles : [req.files.attachedFiles]) : [];

for (let index = 0; index < attachedFiles.length; index++) {
    const file = attachedFiles[index];
    const filePath = "uploads/" + Date.now().toString() + file.name;
    files.push(filePath);

    let path2 = "./" + filePath;
    file.mv(path2, (err) => {
        if (err) {
            console.error(err);
        }
    });
}
    // Create a new blog 
    blog.create({
        authorID: userId,
        authorName: req.FullName,
        title: data.title,
        description: data.description,
        attachedFiles: files,
        comments: [{
            // writer: req.FullName, 
            // comment: data.comment 
        }]
    }).then(data => {
        res.status(201).json(data);
    }).catch(err => {
        res.status(500).json({ "Message": "There was some error" });
    });
};
//Function for deleting blog by ID
let DeleteBlogById = async (req, res) => {
    let blogId = req.params.id;
    let userId = req.userId; 

    try {
        // Find the blog by ID
        let blogToDelete = await blog.findOne({_id: blogId});
        // Check if the blog exists
        if (!blogToDelete) {
            return res.status(404).json({ "Message": "Blog not found" });
        }


        // Check if the requesting user is the author of the blog
        if (blogToDelete.authorID !== userId) {
            return res.status(403).json({ "Message": "You are not authorized to delete this blog" });
        }

        // Delete the blog
        let deletedBlog = await blog.findByIdAndDelete(blogId);

        // Check if the blog was successfully deleted
        if (deletedBlog) {
            res.status(200).json(deletedBlog);
        } else {
            res.status(500).json({ "Message": "Error deleting the blog" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};



let GetCurrentUserBlogs = async (req, res) => {
    try {
        // Get the user ID from the token
        const userId = req.userId;

        // Find all blogs that match the user ID
        const userBlogs = await blog.find({ authorID: userId });

        // Check if any blogs were found
        if (userBlogs.length > 0) {
            res.status(200).json(userBlogs);
        } else {
            res.status(404).json({ "Message": "No blogs found for the authenticated user" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Internal server error" });
    }
};

const UpdateBlogById = async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.userId;

        // Find the existing blog
        let existingBlog = await blog.findById(blogId);

        // Check if the blog exists
        if (!existingBlog) {
            return res.status(404).json({ "Message": "Blog not found" });
        }

        // Check if the requesting user is the author of the blog
        if (existingBlog.authorID !== userId) {
            return res.status(403).json({ "Message": "You are not authorized to update this blog" });
        }

        // Update the blog 
        existingBlog.title = req.body.title || existingBlog.title;
        existingBlog.description = req.body.description || existingBlog.description;

        // Handle attached files (if any)
        const attachedFiles = req.files ? (Array.isArray(req.files.attachedFiles) ? req.files.attachedFiles : [req.files.attachedFiles]) : [];
        const files = [];

        for (let index = 0; index < attachedFiles.length; index++) {
            const file = attachedFiles[index];
            const filePath = "uploads/" + Date.now().toString() + file.name;
            files.push(filePath);

            let path2 = "./" + filePath;
            file.mv(path2, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        // Update the attachedFiles 
        existingBlog.attachedFiles = files;

        // Save the updated blog
        let updatedBlog = await existingBlog.save();

        // Respond with the updated blog
        res.status(200).json(updatedBlog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};


let GetBlogById = async (req, res) => {
    let blogId = req.params.id;
    let userId = req.userId; 

    try {
        // Find the blog by ID
        let _blog = await blog.findOne({_id: blogId});
        // Check if the blog exists
        if (!_blog) {
            return res.status(404).json({ "Message": "Blog not found" });
        }

        // Check if the blog was successfully deleted
        if (_blog) {
            res.status(200).json(_blog);
        } else {
            res.status(500).json({ "Message": "Error finding the blog" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};







module.exports = {
    CreateBlog,
    DeleteBlogById,
    GetCurrentUserBlogs,
    UpdateBlogById,
    GetBlogById
}