const requireSubvert = require('require-subvert')(__dirname);
const sinon = require('sinon');
const configStub = sinon.stub();
requireSubvert.subvert('smart-config', { get: configStub });

const assert = require('assert');
const fn = require('../src/helpers/email/get-template-id');

describe('Templates map', () => {

  it('use template id directly', () => {
    configStub.returns(null);

    const template = '123456';
    const templateId = fn(template);

    assert.equal(templateId, template);
  });

  it('use template id from template map', () => {
    const templateName = 'alerts';
    const templateId = '123';

    configStub.returns({ [templateName]: templateId });
    const result = fn(templateName);

    assert.equal(result, templateId);
  });

  it('empty default vars', () => {
    configStub.returns(null);

    const template = 'alerts';
    const templateId = fn(template);

    assert.equal(templateId, template);
  });

});
