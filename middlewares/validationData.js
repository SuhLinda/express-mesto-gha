const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/constants');

function validationUserId() {
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().hex().length(24),
    }),
  });
}

function validationCreateUser() {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri().regex(regExp),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
}

function validationLogin() {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  });
}

function validationUpdateProfile() {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  });
}

function validationUpdateAvatar() {
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri().regex(regExp),
    }),
  });
}

function validationCreateCard() {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      avatar: Joi.string().uri().regex(regExp),
    }),
  });
}

function validationCardId() {
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().hex().length(24),
    }),
  });
}

module.exports = {
  validationUserId,
  validationCreateUser,
  validationLogin,
  validationUpdateProfile,
  validationUpdateAvatar,
  validationCreateCard,
  validationCardId,
};
