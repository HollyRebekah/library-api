const User = require('../src/models/user');

describe('Users', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', (done) => {
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

          User.findbyId(res.body._id, (err, user) => {
            expect(err).to.equal(null);
            expect(user.firstName).to.equal('Holly');
            expect(user.lastName).to.equal('Fanthorpe');
            expect(user.email).to.equal('hollyfanthorpe@gmail.com');
            expect(user.password).to.equal('password123');
            done();
          });
        });
    });
  });
});
