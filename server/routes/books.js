/*Author: Kam Fai, Ma
Student ID: 301276248
Date:   07/04/2023
Filename: books.js */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    //create an emptyBook object to pass blank values
    const emptyBook = {
      Title: "", 
      Price: "",
      Author: "",
      Genre: ""}
      //redener books details page
      res.render('books/details', {
        title: 'Add Favourite',
        books: emptyBook
});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    try{
      //instantiate an object of Book model
      const book = new Book({
        Title: req.body.title, 
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre
      })
      //add a new book to the database
      await Book.create(book);
      //redirect too books
      res.redirect('/books');
  }catch(err){
    res.status(500).json({message:err.message})
  }
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //declare id with value of id from the req
    let id = req.params.id;
    let book;
    try{
      //find book by id
      book = await Book.findById(id);
      if(book != null){
        res.render('books/details', {
          title: 'Update Details',
          books: book
        });
      }else{
        res.status(404).json({
          message: 'Book with ID '+req.params.id+' cannot be found'
        })
      }
    }catch(err){
      res.status(500).json({message: err.message
      })
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  //declare id with value of id from the req
  let id = req.params.id;
  let book;
  //get updates from the req
  let updates = {
    Title: req.body.title, 
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre};

  try{
    //find book by id
    book = await Book.findById(id);
    if(book != null){
      //update
      await book.update(updates);
      //redirect to books
      res.redirect('/books');
    }else{
      res.status(404).json({
        message: 'Book with ID '+req.params.id+' cannot be found'
      })
    }
  }catch(err){
    res.status(500).json({message: err.message
    })
  }

  /* another way by findOneAndUpdate
  const filter = { _id: req.params.id };
  const update = {
    Title: req.body.title, 
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre};
  try{
    console.log(filter);
    console.log(update);
    const book = await Book.findOneAndUpdate(filter, update, {new: true});
    res.redirect('/books');
  }catch(err){
    res.status(500).json({message:err.message})
  }*/
});

// GET - process the delete by user id
router.get('/delete/:id', async(req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //declare id with value of id from the req
    let id = req.params.id;
    try{
      //remove by id
      await Book.remove({_id:id});
      //redirect to books
      res.redirect('/books');
    }catch(err){
      res.status(500).json({message:err.message});
    }
});

module.exports = router;
