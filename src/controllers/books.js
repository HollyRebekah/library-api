const Book = require('../models/book');

exports.create = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn,
    user: req.body.user,
  });
  book.save()
    .then(() => {
      res.status(201).json(book);
    });
};
