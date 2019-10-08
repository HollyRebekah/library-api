const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: String,
  isbn: String,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
