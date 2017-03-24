const sinon = require('sinon');

let postmarkStub;

function register() {

  postmarkStub = sinon.stub(require('postmark'), 'Client', () => ({
    sendEmailAsync: async(arg) => arg,
    sendEmailWithTemplateAsync: async(arg) => arg
  }));

  return { postmarkStub };
}

function getStubs() {
  return { postmarkStub };
}

module.exports = { register, getStubs };
