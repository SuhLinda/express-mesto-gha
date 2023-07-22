class SuccessfulCardDeletion extends Error {
  constructor(message) {
    super(message);
    this.name = 'SuccessfulCardDeletion';
    this.statusCode = 200;
  }
}

module.exports = SuccessfulCardDeletion;
