const mongoose = require('mongoose');
const recipient = require('./recipient');

module.exports = function () {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(recipient);
};
