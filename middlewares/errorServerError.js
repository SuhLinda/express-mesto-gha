function errorServerError(err, req, res, next) {
  const { statusCode = 500, message = 'Ошибка сервера' } = err;
  res.status(statusCode).send({ message });
  next(err);
}

module.exports = errorServerError;
