const {blockUser, getAllBlogs} = require("../Controller/AdminController")

const express = require("express");
const { AuthenticateUser } = require("../utils");
const router4 = express.Router();

router4.put("/blockUser/:id" ,AuthenticateUser, blockUser)
router4.get("/get-all-blogs/" ,AuthenticateUser, getAllBlogs)
module.exports = router4;