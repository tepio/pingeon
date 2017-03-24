require('./test-env');
const { isMatch } = require('lodash');
const getTemplateVars = require('../src/helpers/email/get-template-vars');

let recipient = { firstName: 'John', lastName: 'Testerson' };
const defaultVars = require('smart-config').get('email.defaultVars');
const vars = {
  actionUrl: 'http://some.com/any',
  message: 'whatever'
};
const toEmail = 'to@email.com';

describe('Get template vars', () => {

  describe('User exist', () => {
    before(() => request
      .post('/recipients')
      .send(recipient)
      .expect(201)
      .expect(({ body }) => {
        recipient = body;
      }));

    it('should have all expected vars', async() => {
      const resultVars = await getTemplateVars({ vars, toEmail, recipientId: recipient.id });

      assert.equal(resultVars.firstName, recipient.firstName);
      assert.equal(resultVars.lastName, recipient.lastName);
      assert.equal(resultVars.currentYear, new Date().getFullYear());
      assert.equal(resultVars.toEmail, toEmail);
      assert.ok(isMatch(resultVars), defaultVars);
    });
  });

  describe('User not exist', () => {

    let resultVars;
    before(async() => {
      resultVars = await getTemplateVars({ vars, toEmail, recipientId: helpers.randomId() });
    });

    it('should have all expected vars', () => {
      assert.equal(resultVars.currentYear, new Date().getFullYear());
      assert.equal(resultVars.toEmail, toEmail);
      assert.ok(isMatch(resultVars), defaultVars);
    });

    it('should not have user name', () => {
      assert(!resultVars.firstName);
      assert(!resultVars.lastName);
    });

  });

});
