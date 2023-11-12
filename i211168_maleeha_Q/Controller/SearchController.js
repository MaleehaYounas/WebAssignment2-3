const blog = require("../models/Blog.schema") 

// Route to search for a word in all blog titles
const searchByWord = async (req, res) => {
    try {
        const word = req.params.word;
        
        // Writing query to search for the word in title of blog
        const query = { description: { $regex: word, $options: 'i' } };

        // Execute the query and sorting
        const searchResults = await blog.find(query).sort({ createdAt: -1 });

            
        // Respond with the search results
        res.status(200).json(searchResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};

const searchByAuthor = async (req, res) => {
    try {
        const author = req.params.author;

        // Writing query to search for the word in title of blog
        const query = { authorName: { $regex: author, $options: 'i' } };

        // Execute the query
        const searchResults = await blog.find(query).sort({ createdAt: -1 });

        // Respond with the search results
        res.status(200).json(searchResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};


const searchByTitle = async (req, res) => {
    try {
        const author = req.params.author;

        // Writing query to search for the word in title of blog
        const query = { title: { $regex: author, $options: 'i' } };

        // Execute the query
        const searchResults = await blog.find(query).sort({ createdAt: -1 });

        // Respond with the search results
        res.status(200).json(searchResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Message": "Server error" });
    }
};


module.exports = {searchByWord, searchByAuthor, searchByTitle};
