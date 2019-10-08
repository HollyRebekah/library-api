const User = require('../src/models/user');
const chai = require('chai');
const DataFactory = require('./helpers/data-factory');

describe('/books', () => {
  let userInfo;
  beforeEach((done) => {
    userInfo = DataFactory.user();
    chai.request(server)
      .post('/users')
      .send(userInfo)
      .end(() => {
        done();
      });
  });
  it('creates a new book listing', (done) => {
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
});
