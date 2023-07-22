class Success extends Error {
  constructor(message) {
    super(message);
    this.name = 'Success';
    this.statusCode = 201;
  }
}

module.exports = Success;
