const awsStub = require('./mocks/aws.stub');
const postmarkStub = require('./mocks/postmark.stub');
const requireSubvert = require('require-subvert')(__dirname);
const pubsubMock = require('./mocks/pubsub.mock');

requireSubvert.subvert('../src/helpers/pubsub', pubsubMock);
awsStub.register();
postmarkStub.register();

module.exports = { awsStub };
