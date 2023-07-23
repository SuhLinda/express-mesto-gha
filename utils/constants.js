const rateLimit = require('express-rate-limit');

const SALT_QUANTITY = 10;
const regExp = /^(https?:\/\/)?(www\.)?[A-Za-z0-9-]+\.[A-Za-z]{2,}(\/[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  SALT_QUANTITY,
  regExp,
  limiter,
};
