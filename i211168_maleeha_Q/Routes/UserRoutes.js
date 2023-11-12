const {getAllUsers , GetUserById, Createuser, updateuserById, DeleteUserById, Login} = require("../Controller/UserController")

const express = require("express");
const { AuthenticateUser } = require("../utils");

const router = express.Router();

//router.get("/" , AuthenticateUser ,  getAllUsers )
router.get("/" ,  getAllUsers )
router.post("/login" , Login )

router.get("/:id" , GetUserById)

router.post("/" , Createuser)


router.patch("/:id" , updateuserById)

router.delete("/:id" ,DeleteUserById)


module.exports = router;


