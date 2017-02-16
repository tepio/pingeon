require('./test-env');
const fn = require('../src/helpers/email/get-template-id');
const config = require('smart-config');

describe('Templates map', () => {

  it('use template id directly', () => {
    const template = '123456';
    const templateId = fn(template);

    assert.equal(templateId, template);
  });

  it('use template id from template map', () => {
    const template = 'alerts';
    const alertsTemplateId = config.get(`email.templatesMap.${template}`);
    const templateId = fn(template);

    assert.equal(templateId, alertsTemplateId);
  });

});
