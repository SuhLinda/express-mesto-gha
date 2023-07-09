const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const path = require('path');

const bodyParser = require('body-parser');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a6cc72d902954a3d0b02b1',
  };
  next();
});

app.use(routesUsers);
app.use(routesCards);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
