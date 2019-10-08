const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  isbn: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
