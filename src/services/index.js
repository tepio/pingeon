const mongoose = require('mongoose');
const packageJson = require('../../package.json');
const { serverStatus } = require('node-helpers');

const recipient = require('./recipient');
const provider = require('./provider');
const recipientProfile = require('./recipient-profile');
const config = require('../helpers/config');

module.exports = function () {
  const app = this;

  mongoose.connect(config.get('db').url);
  mongoose.Promise = global.Promise;

  app.configure(recipient);
  app.configure(provider);
  app.configure(recipientProfile);

  app.service('/', { find: serverStatus(packageJson) });
};
