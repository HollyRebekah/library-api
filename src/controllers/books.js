const Book = require('../models/book');

exports.create = (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    isbn: req.body.isbn,
    user: req.body.user,
  });
  newBook.save()
    .then(() => {
      Book.findOne()
        .where('isbn').equals(req.body.isbn)
        .populate({ path: 'user' })
        .exec((err, book) => {
            console.log(err);
          res.status(201).json(book);
        });
    });
};
