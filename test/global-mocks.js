const mockery = require('mockery');
const requireSubvert = require('require-subvert')(__dirname);
const pubsubSubstitute = ['../src/helpers/pubsub', './mocks/pubsub.mock.js'];
const awsStub = require('./mocks/aws.stub');

requireSubvert.subvert('../src/helpers/email-send', require('./mocks/email.mock'));

mockery.enable({ warnOnUnregistered: false });
mockery.registerSubstitute(...pubsubSubstitute);
awsStub.register();

module.exports = { awsStub };
