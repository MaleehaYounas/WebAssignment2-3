const {searchByWord, searchByAuthor, searchByTitle} = require("../Controller/SearchController")

const express = require("express");

const router3 = express.Router();


router3.get("/:word" ,searchByWord)
router3.get("/author/:author" ,searchByAuthor)
router3.get("/title/:author" ,searchByTitle)

module.exports = router3;