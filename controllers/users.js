const User = require('../models/user');
const {
  ERROR_CODE_STATUS_201,
  ERROR_CODE_STATUS_400,
  ERROR_CODE_MESSAGE_400,
  ERROR_CODE_STATUS_404,
  ERROR_CODE_MESSAGE_USER_404,
  ERROR_CODE_STATUS_500,
  ERROR_CODE_MESSAGE_500,
} = require('../utils/constants');

function getUsers(req, res) {
  return User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(ERROR_CODE_STATUS_500).send({
        message: ERROR_CODE_MESSAGE_500,
        err,
      });
    });
}

function getUser(req, res) {
  const { id } = req.params;
  return User.findById(id)
    .orFail((err) => {
      res.status(ERROR_CODE_STATUS_404).send({
        message: ERROR_CODE_MESSAGE_USER_404,
        err,
      });
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(ERROR_CODE_STATUS_500).send({
        message: ERROR_CODE_MESSAGE_500,
        err,
      });
    });
}

function createUser(req, res) {
  return User.create({ ...req.body })
    .then((user) => {
      res.status(ERROR_CODE_STATUS_201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_STATUS_400).send({
          message: ERROR_CODE_MESSAGE_400,
          err,
        });
        return;
      }
      res.status(ERROR_CODE_STATUS_500).send({
        message: ERROR_CODE_MESSAGE_500,
      });
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_STATUS_400).send({
          message: ERROR_CODE_MESSAGE_400,
          err,
        });
        return;
      }
      res.status(ERROR_CODE_STATUS_500).send({
        message: ERROR_CODE_MESSAGE_500,
        err,
      });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_STATUS_400).send({
          message: ERROR_CODE_MESSAGE_400,
          err,
        });
        return;
      }
      res.status(ERROR_CODE_STATUS_500).send({
        message: ERROR_CODE_MESSAGE_500,
      });
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
