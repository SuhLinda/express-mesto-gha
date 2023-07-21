const Card = require('../models/card');
const SuccessfulCardDeletion = require('../errors/SuccessfulCardDeletion');
const Success = require('../errors/Success');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');

function getCards(req, res, next) {
  return Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      next(err);
    });
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
      throw new Success('Карточка создана');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

function deleteCard(req, res, next) {
  const owner = req.user._id;
  const { id } = req.params;

  Card.findById(id)
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => {
      if (owner.toString() === card.owner.toString()) {
        Card.deleteOne(card)
          .then(() => {
            throw new SuccessfulCardDeletion('Карточка удалена');
          });
      } else {
        next(new Error('Вы не являетесь владельцем карточки'));
      }
      next();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

function likeCard(req, res, next) {
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
        next(new ErrorBadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

function dislikeCard(req, res, next) {
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
      if (err.name === 'ErrorBadRequest' || err.name === 'CastError') {
        next(new ErrorBadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
