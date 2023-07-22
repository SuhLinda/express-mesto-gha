const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const path = require('path');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const entrance = require('./routes/auth');

const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(entrance);
app.use(auth, routesUsers);
app.use(auth, routesCards);

app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
