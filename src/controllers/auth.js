const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user !== null && user.validatePassword(req.body.password)) {
        const payload = {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1w' }, (err, token) => {
          res.status(200).json({ authorise: token });
        });
      } else {
        res.sendStatus(401);
      }
    });
};
