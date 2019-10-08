const express = require('express');
const userController = require('./controllers/user');
const authController = require('./controllers/auth');
const bookController = require('./controllers/books');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.post('/users', userController.create);

app.post('/auth/login', authController.login);

app.post('/books', bookController.create);

module.exports = app;
