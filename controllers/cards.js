const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Ошибка сервера',
      });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({name, link, owner})
    .then((card) => {
      res.status(201).send({data: card});
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

function deleteCard(req, res) {
  const owner = req.user._id;

  Card.findById(owner)
    .then((card) => {
      Card.deleteOne(card)
        .then(() => {
          res.status(200).send('Карточка удалена');
        })
    })
    .catch((err) => {
      if(err.name === 'CastError') {
        return res.status(404).send({
          message: 'Карточка не найдена'
        })
      } else {
        return res.status(500).send({
          message: 'Ошибка сервера'
        })
      }
    })
};

function likeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.user._id,
    {$addToSet: {likes: req.user._id}},
    {
      new: true
    }
  )
    .then(() => {
      res.status(200).send('Like');
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

function dislikeCard(req, res) {
  return Card.findByIdAndUpdate(
    req.user._id,
    {$pull: {likes: req.user._id}},
    {
      new: true
    }
  )
    .then(() => {
      res.status(200).send('Dislike');
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
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
};