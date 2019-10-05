const User = require('../src/models/user');
const chai = require('chai');

describe('Users', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database and encrypts the password', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'Holly',
          lastName: 'Fanthorpe',
          email: 'hollyfanthorpe@gmail.com',
          password: 'password123',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (error, user) => {
            expect(error).to.equal(null);
            expect(user.firstName).to.equal('Holly');
            expect(user.lastName).to.equal('Fanthorpe');
            expect(user.email).to.equal('hollyfanthorpe@gmail.com');
            expect(user.password).not.equal('password123');
            expect(user.password).to.have.lengthOf(60);
            expect(res.body).not.to.have.property('password');
            done();
          });
        });
    });

    it('checks for a valid email address', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'Holly',
          lastName: 'Fanthorpe',
          email: 'hollyfanthorpe',
          password: 'password123',
        })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.errors.email).to.equal('Invalid email address');
          
          User.countDocuments({}, (error, users) => {
            expect(users).to.have.lengthOf(0);
            done();
          });
        });
    });
  });
});
