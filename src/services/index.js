const packageJson = require('../../package.json');
const { serverStatus } = require('node-helpers');

const recipient = require('./recipient');
const provider = require('./provider');
const recipientProfile = require('./recipient-profile');

module.exports = function () {
  const app = this;

  app.configure(recipient);
  app.configure(provider);
  app.configure(recipientProfile);

  app.service('/', { find: serverStatus(packageJson) });
};
