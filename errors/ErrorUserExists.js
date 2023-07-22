class errorUserExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'errorUserExists';
    this.statusCode = 409;
  }
}

module.exports = errorUserExists;
