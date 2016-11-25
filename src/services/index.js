const mongoose = require('mongoose');
const Promise = require('bluebird');
const packageJson = require('../../package.json');
const { serverStatus } = require('node-helpers');

const recipient = require('./recipient');
const provider = require('./provider');
const recipientProfile = require('./recipient-profile');
const config = require('smart-config');

module.exports = function () {
  const app = this;

  mongoose.connect(config.get('db').url);
  mongoose.Promise = Promise;

  app.configure(recipient);
  app.configure(provider);
  app.configure(recipientProfile);

  app.service('/', { find: serverStatus(packageJson) });
};
