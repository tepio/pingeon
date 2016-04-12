const mockery = require('mockery');
const pubsubSubstitute = ['../src/helpers/pubsub', './mocks/pubsub.mock.js'];

function register() {
  mockery.enable({ warnOnUnregistered: false });
  mockery.registerSubstitute(...pubsubSubstitute);
}

function deregister() {
  mockery.deregisterSubstitute(...pubsubSubstitute);
}

module.exports = { register, deregister };
