/*Author: Kam Fai, Ma
Student ID: 301276248
Date:   07/04/2023
Filename: index.js */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* GET detail page */
router.get('/details', (req, res, next) => {
  res.render('content/index', {
    title: 'Details',
    books: ''
   });
});

module.exports = router;
