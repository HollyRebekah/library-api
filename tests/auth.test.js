const DataFactory = require('./helpers/data-factory');
const chai = require('chai');
const jwt = require('jsonwebtoken');

describe('authorisation', () => {
  let userInfo;
  beforeEach((done) => {
    userInfo = DataFactory.user();
    chai.request(server)
      .post('/users')
      .send(userInfo)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('authorises a user when they sign in', (done) => {
    chai.request(server)
      .post('/auth/login')
      .send({ email: userInfo.email })
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
});
