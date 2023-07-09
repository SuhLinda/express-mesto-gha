const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      res.status(200).send({data: users});
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Ошибка сервера'
      })
    })
};

function getUser(req, res) {
  const {id} = req.params;
  return User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if(err.name === 'CastError') {
        return res.status(404).send({
          message: 'Пользователь не найден'
        })
      } else {
        return res.status(500).send({
          message: 'Ошибка сервера'
        })
      }
    })
};

function createUser(req, res) {

  return User.create({...req.body})
    .then((user) => {
      res.status(201).send({data: user});
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные'
        })
      } else {
        return res.status(500).send({
          message: 'Ошибка сервера'
        })
      }
    })
};

function updateProfile(req, res) {
  const {name, about} = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    {name, about},
    {
      new: true,
      upsert: true
    }
  )
    .then((user) => {
      res.status(201).send({data: user});
    })
    .catch((err) => {
      if(err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные'
        })
      } else {
        return res.status(500).send({
          message: 'Ошибка сервера'
        })
      }
    })
};

function updateAvatar(req, res) {
  const {avatar} = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    {avatar},
    {
      new: true,
      upsert: true
    }
  )
    .then((user) => {
      res.status(201).send({data: user});
    })
    .catch((err) => {
      if(err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные'
        })
      } else {
        return res.status(500).send({
          message: 'Ошибка сервера'
        })
      }
    })
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar
};