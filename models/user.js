const mongoose = require('mongoose');
const validator = require('validator/es');

const userSchema = new mongoose.Schema(
  {
  name: {
    type: String,
    minLength: [2, 'Минимальная длина поля "name" - 2 знака'],
    maxLength: [30, 'Максимальная длина поля "name" - 30 знаков'],
    required: [true, 'Необходимо заполнить поле "name"'],
  },
  about: {
    type: String,
    minLength: [2, 'Минимальная длина поля "name" - 2 знака'],
    maxLength: [30, 'Максимальная длина поля "name" - 30 знаков'],
    required: [true, 'Необходимо заполнить поле "about"'],
  },
  avatar: {
    type: String,
    required: [true, 'Необходимо заполнить поле "avatar"'],
    validate: {
      validator: (url) =>
        validator.isURL(url),
      message: 'Введён неккоректный URL',
    },
  },
},
{
  versionKey: false, 
});


module.exports = mongoose.model('user', userSchema);
