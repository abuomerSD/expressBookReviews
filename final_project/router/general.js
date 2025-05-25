const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(400).json({message: "Enter username and password"});
  }
  users.push({username, password});
  
  return res.status(200).json({users});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json({isbn});
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;

  for(let book in books) {
    bookObj = books[book];
    if(bookObj.author === author){
      return res.status(200).json(bookObj);
    }
  }
  return res.status(400).json({message: 'Error finding book by author'});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  for(let book in books) {
    bookObj = books[book];
    if(bookObj.title === title){
      return res.status(200).json(bookObj);
    }
  }
  return res.status(400).json({message: 'Error finding book by title'});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  for(let book in books) {
    bookObj = books[book];
    if(book === isbn){
      return res.status(200).json({reviews: bookObj.reviews});
    }
  }
  return res.status(400).json({message: 'Error finding book reviews by isbn'});
});

module.exports.general = public_users;
