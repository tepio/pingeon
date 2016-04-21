const sinon = require('sinon');

let createEndpointStub;
let publishStub;
let awsStub;

function register() {
  createEndpointStub = sinon.stub().returns({ EndpointArn: '1' });
  publishStub = sinon.stub().returns({ MessageId: '2' });
  awsStub = sinon.stub(require('aws-sdk'), 'SNS', () => ({
    createPlatformEndpointAsync: createEndpointStub,
    publishAsync: publishStub
  }));

  return { awsStub, createEndpointStub, publishStub };
}

function getStubs() {
  return { awsStub, createEndpointStub, publishStub };
}

module.exports = { register, getStubs };
