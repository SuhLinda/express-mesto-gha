const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const entrance = require('./routes/auth');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');

const app = express();

app.use(bodyParser.json());

app.use(entrance);
app.use(auth, routesUsers);
app.use(auth, routesCards);

app.use(errors());
app.use(handleError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT);
