require('./test-env');

const { isMatch } = require('lodash');
const locationGroup = 'location1';
const emailProvider = require('../src/helpers/email');
const templatesMap = require('smart-config').get('email.templatesMap');
const email = 'testerson@gmail.com';
const cc = email;
const bcc = email;
const template = 'alerts';
const vars = {
  firstName: 'Constantine',
  actionUrl: 'http://google.com',
  message: 'Alerts test'
};
const message = 'Hello!';
const subject = 'Test!';

describe('Email send', function () {
  this.timeout(100000);

  describe('message', () => {

    it('should be sent', async() => {
      const res = await emailProvider.send({ email, message, subject, cc, bcc, locationGroup });
      assert.ok(isMatch(res.TextBody, message));
      assert.ok(isMatch(res.Subject, subject));
    });

  });

  describe('template', () => {

    it('should be sent', async() => {
      const res = await emailProvider.send({ subject, email, template, vars, cc, bcc, locationGroup });

      assert.equal(res.TemplateId, templatesMap[template]);
      assert.ok(isMatch(res.TemplateModel, vars));
    });

  });

});
