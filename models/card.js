const mongoose = require('mongoose');
const User = require('../models/user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    ref: User,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    ref: User,
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('card', cardSchema);