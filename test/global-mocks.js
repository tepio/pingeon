const mockery = require('mockery');
const pubsubSubstitute = ['../src/helpers/pubsub', './mocks/pubsub.mock.js'];
const emailSubstitute = ['../src/helpers/email', './mocks/email.mock.js'];
const awsStub = require('./mocks/aws.stub');

mockery.enable({ warnOnUnregistered: false });
mockery.registerSubstitute(...pubsubSubstitute);
mockery.registerSubstitute(...emailSubstitute);
awsStub.register();

module.exports = { awsStub };
