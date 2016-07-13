const sinon = require('sinon');

let createEndpointStub;
let publishStub;
let awsStub;
let setEndpointAttributesStub;

function register() {
  createEndpointStub = sinon.stub().returns({ EndpointArn: '1' });
  publishStub = sinon.stub().returns({ MessageId: '2' });
  setEndpointAttributesStub = sinon.stub();

  awsStub = sinon.stub(require('aws-sdk'), 'SNS', () => ({
    createPlatformEndpointAsync: createEndpointStub,
    publishAsync: publishStub,
    setEndpointAttributesAsync: setEndpointAttributesStub
  }));

  return { awsStub, createEndpointStub, publishStub };
}

function getStubs() {
  return { awsStub, createEndpointStub, publishStub };
}

module.exports = { register, getStubs };
