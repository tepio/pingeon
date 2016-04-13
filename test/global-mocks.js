const mockery = require('mockery');
const pubsubSubstitute = ['../src/providers/pubsub', './mocks/pubsub.mock.js'];
const emailSubstitute = ['../src/providers/email', './mocks/email.mock.js'];

function register() {
  mockery.enable({ warnOnUnregistered: false });
  mockery.registerSubstitute(...pubsubSubstitute);
  mockery.registerSubstitute(...emailSubstitute);
}

function deregister() {
  mockery.deregisterSubstitute(...pubsubSubstitute);
  mockery.deregisterSubstitute(...emailSubstitute);
}

module.exports = { register, deregister };
