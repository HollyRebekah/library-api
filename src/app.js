const express = require('express');
const userController = require('./controllers/user');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.post('/users', userController.create);

module.exports = app;
