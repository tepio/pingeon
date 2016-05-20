const requireSubvert = require('require-subvert')(__dirname);
const awsStub = require('./mocks/aws.stub');

requireSubvert.subvert('../src/helpers/pubsub', require('./mocks/pubsub.mock.js'));
requireSubvert.subvert('../src/helpers/email-send', require('./mocks/email.mock'));

awsStub.register();

module.exports = { awsStub };
