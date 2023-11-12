const {CreateBlog, DeleteBlogById, GetCurrentUserBlogs, UpdateBlogById, GetBlogById} = require("../Controller/BlogController")

const express = require("express");
const { AuthenticateUser } = require("../utils");
const router2 = express.Router();
router2.get("/currentUserBlogs" ,  AuthenticateUser, GetCurrentUserBlogs )
router2.get("/:id" ,AuthenticateUser,  GetBlogById)
router2.post("/upload" ,AuthenticateUser, CreateBlog)
router2.patch("/:id" , AuthenticateUser, UpdateBlogById)
router2.delete("/:id" , AuthenticateUser, DeleteBlogById)


module.exports = router2;


