require('./test-env');

const assert = require('assert');
const emailProvider = require('../src/helpers/email');
const email = 'kozzztya@gmail.com';
const cc = email;
const bcc = email;
const template = '973317';
const vars = {
  product_name: 'Pingeon',
  name: 'Vasya',
  action_url: 'http://google.com',
  sender_name: 'Petya',
  product_address_line1: 'http://google.com',
  product_address_line2: 'http://google.com'
};
const message = 'Hello!';
const subject = 'Test!';

describe('Email send', function () {
  this.timeout(100000);

  describe('message', () => {

    it('should be sent', done => {
      return emailProvider
        .send({ email, message, subject, cc, bcc })
        .then(res => {
          assert.ok(res);
          done();
        });
    });

  });

  describe('template', () => {

    it('should be sent', done => {
      return emailProvider
        .send({ email, template, vars, cc, bcc })
        .then(res => {
          assert.ok(res);
          done();
        });
    });

  });

});
