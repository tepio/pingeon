const mongoose = require('mongoose');

const recipient = require('./recipient');
const provider = require('./provider');
const recipientProfile = require('./recipient-profile');

module.exports = function () {
  const app = this;

  mongoose.connect(app.get('db').url);
  mongoose.Promise = global.Promise;

  app.configure(recipient);
  app.configure(provider);
  app.configure(recipientProfile);
};
