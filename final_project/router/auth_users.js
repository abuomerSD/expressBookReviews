const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;

  users.forEach(user => {
    if(user.username === username && user.password === password){
      const token =  jwt.sign(user, 'dsasds');
      return res.status(200).json({
        username,
        token
      });
    }
  })
  return res.status(400).json({message: "Error in login"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { username, review } = req.query;
  const {isbn} = req.params;
  
  const count = Object.keys(books).length;
  const key = count + 1;
  for(let book in books) {
    if(book === isbn){
      let bookObj = books[book];
      
      bookObj.reviews.key = {username, review}
      res.status(200).json(books);

    }
  }

  return res.status(400).json({message: "Error"});
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { username, review } = req.query;
  const {isbn} = req.params;
  
  const count = Object.keys(books).length;
  const key = count + 1;
  for(let book in books) {
    if(book === isbn){
      let bookObj = books[book];
      
      bookObj.reviews.key = {}
      res.status(200).json(books);

    }
  }

  return res.status(400).json({message: "Error"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
