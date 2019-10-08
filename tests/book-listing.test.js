const Book = require('../src/models/book');
const chai = require('chai');
const DataFactory = require('./helpers/data-factory');

describe('/books', () => {
  let userInfo;
  let bookInfo;
  let userId;
  beforeEach((done) => {
    userInfo = DataFactory.user();
    chai.request(server)
      .post('/users')
      .send(userInfo)
      .end((err, res) => {
        userId = res.body._id;
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}, () => {
      done();
    });
  });

  it('creates a new book listing', (done) => {
    bookInfo = {
      title: 'The Martian',
      author: 'Andy Weir',
      genre: 'Science Fiction',
      isbn: '978-0-8041-3902-1',
      user: userId,
    };
    chai.request(server)
      .post('/books')
      .send(bookInfo)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);

        Book.findById(res.body._id, (error, book) => {
          expect(book).to.have.property('user');
          expect(book).to.have.property('title');
          expect(book).to.have.property('author');
          expect(book).to.have.property('genre');
          expect(book).to.have.property('isbn');
          done();
        });
      });
  });

  it('will not create a new book listing if title field is missing', (done) => {
    const { title, ... rest } = bookInfo;
    chai.request(server)
      .post('/books')
      .send(rest)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('All book listings must contain a title and author');
        Book.find({}, (error, books) => {
          expect(error).to.equal(null);
          expect(books).to.have.lengthOf(0);
          done();
        });
      });
  });

  it('will not create a new book listing if author fielf is missing', (done) => {
    const { title, author, ... rest } = bookInfo;
    chai.request(server)
      .post('/books')
      .send(title, rest)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('All book listings must contain a title and author');
        Book.find({}, (error, books) => {
          expect(error).to.equal(null);
          expect(books).to.have.lengthOf(0);
          done();
        });
      });
  });
});
