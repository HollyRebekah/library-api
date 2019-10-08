const DataFactory = require('./helpers/data-factory');
const chai = require('chai');
const jwt = require('jsonwebtoken');

describe('/auth', () => {
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

  it('authorises a user when they sign in', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send({ email: userInfo.email, password: userInfo.password })
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);

        const decoded = jwt.decode(res.body.authorise);
        expect(decoded).to.have.property('firstName');
        expect(decoded).to.have.property('lastName');
        expect(decoded).to.have.property('id');
        done();
      });
  });

  it('doesn\'t allow login with an inccorect email', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send({ email: 'email@incorrect.com' })
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body).not.to.have.property('authorise');
        done();
      });
  });

  it('doesn\'t allow login with an incorrect password', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send({
        email: userInfo.email,
        password: 'incorrectPassword',
      })
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(401);
        expect(res.body).not.to.have.property('authorise');
        done();
      });
  });
});
