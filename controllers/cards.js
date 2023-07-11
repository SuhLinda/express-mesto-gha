const Card = require('../models/card');
const {
  ERROR_CODE_MESSAGE_CARD_200,
  ERROR_CODE_STATUS_201,
  ERROR_CODE_STATUS_400,
  ERROR_CODE_MESSAGE_400,
  ERROR_CODE_STATUS_404,
  ERROR_CODE_MESSAGE_CARD_404,
  ERROR_CODE_STATUS_500,
  ERROR_CODE_MESSAGE_500,
} = require('../utils/constants');

function getCards(req, res) {
  return Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(ERROR_CODE_STATUS_500).send({
        message: ERROR_CODE_MESSAGE_500,
        err,
      });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(ERROR_CODE_STATUS_201).send({ data: card });
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
        err,
      });
    });
}

function deleteCard(req, res) {
  const owner = req.user._id;

  Card.findById(owner)
    .orFail((err) => {
      res.status(ERROR_CODE_STATUS_404).send({
        message: ERROR_CODE_MESSAGE_CARD_404,
        err,
      });
    })
    .then((card) => {
      Card.deleteOne(card)
        .then(() => {
          res.send(ERROR_CODE_MESSAGE_CARD_200);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
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

function likeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .then(() => {
      res.send('Like');
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

function dislikeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.user._id,
    { $pull: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .then(() => {
      res.send('Dislike');
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
