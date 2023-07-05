/*Author: Kam Fai, Ma
Student ID: 301276248
Date:   07/04/2023
Filename: books.js */

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
