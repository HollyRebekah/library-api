const express = require('express');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.post('/users', userController.create);

app.post('/auth/login', authController.login);

module.exports = app;
