const mongoose = require('mongoose');
const user = require('./user');
const validator = require('validator/es');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Минимальная длина поля "name" - 2 знака'],
    maxLength: [30, 'Максимальная длина поля "name" - 30 знаков'],
    required: [true, 'Необходимо заполнить поле "name"'],
  },
  link: {
    type: String,
    required: [true, 'Необходимо заполнить поле "link"'],
    validate: {
      validator: (url) => {
        validator.isURL(url);
      },
      message: 'Введён неккоректный URL',
    },
  },
  owner: {
    ref: user,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [
      {
        ref: 'user',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    default: [],
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  },
  {
    versionKey: false,
  });

module.exports = mongoose.model('card', cardSchema);
