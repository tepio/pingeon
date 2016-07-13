const awsStub = require('./mocks/aws.stub');
awsStub.register();

const sinon = require('sinon');
const pubsub = require('../src/helpers/pubsub');
const pubsubMocks = require('./mocks/pubsub.mock');

sinon.stub(pubsub, 'pub', pubsubMocks.pub);
sinon.stub(pubsub, 'sub', pubsubMocks.sub);
sinon.stub(require('../src/helpers/email'), 'send', require('./mocks/email.mock').send);

module.exports = { awsStub };
