require('./test-env');

const emailProvider = require('../src/helpers/email')();
const email = 'kozzztya@gmail.com';
const template = 'thank-you-registering';
const vars = { completeregistration: 'some' };

describe('Email send', function () {
  this.timeout(100000);

  it('should be sent', () => {
    return emailProvider
      .send(email, { template, vars })
      .then(res => {
        assert.ok(res);
      });
  });

});
