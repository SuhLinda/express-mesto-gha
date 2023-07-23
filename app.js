const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/constants');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const entrance = require('./routes/auth');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const routesNotFound = require('./routes/errorNotFound');

const app = express();

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());

app.use(entrance);
app.use(auth, routesUsers);
app.use(auth, routesCards);
app.use(routesNotFound);

app.use(errors());
app.use(handleError);

mongoose.connect(DB_URL);

app.listen(PORT);
