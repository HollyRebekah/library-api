const User = require('../src/models/user');
const chai = require('chai');
const DataFactory = require('./helpers/data-factory');

describe('Users', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('POST /users', () => {
    const userInfo = DataFactory.user();
    it('creates a new user in the database and encrypts the password', (done) => {
      chai.request(server)
        .post('/users')
        .send(userInfo)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(201);

          User.findById(res.body._id, (error, user) => {
            expect(error).to.equal(null);
            expect(user.firstName).to.equal(userInfo.firstName);
            expect(user.lastName).to.equal(userInfo.lastName);
            expect(user.email).to.equal(userInfo.email);
            expect(user.password).not.equal(userInfo.password);
            expect(user.password).to.have.lengthOf(60);
            expect(res.body).not.to.have.property('password');
            done();
          });
        });
    });

    it('checks for a valid email address', (done) => {
      const userInfoWrongEmail = DataFactory.user({ email: 'email' });
      chai.request(server)
        .post('/users')
        .send(userInfoWrongEmail)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.errors.email).to.equal('Invalid email address');

          User.countDocuments({}, (error, count) => {
            expect(count).to.equal(0);
            done();
          });
        });
    });

    it('checks for a valid password', (done) => {
      const userInfoWrongPassword = DataFactory.user({ password: 'p' });
      chai.request(server)
        .post('/users')
        .send(userInfoWrongPassword)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body.errors.password).to.equal('Password must be at least 8 characters');

          User.countDocuments({}, (error, count) => {
            expect(count).to.equal(0);
            done();
          });
        });
    });
  });
});
