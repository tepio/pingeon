const mongoose = require('mongoose');

const recipient = require('./recipient');
const provider = require('./provider');
const recipientProvider = require('./recipient-provider');

module.exports = function () {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(recipient);
  app.configure(provider);
  app.configure(recipientProvider);
};
