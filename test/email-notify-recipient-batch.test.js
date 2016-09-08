require('./test-env');

const _ = require('lodash');
const { createRecipientProfile } = require('./helpers');
const { ObjectId } = require('mongoose').mongo;

const recipientId = new ObjectId();
const template = 'any';
const vars = { whatever: 'some' };

describe('Email notify recipient', () => {

  before(async() => {
    await createRecipientProfile({ recipientId, providerType: 'email' });
  });

  describe('success', () => {
    it('should be sent to recipient',
      () => request.post('/provider/email/recipient/batch')
        .send([{ recipientId, template, vars }])
        .expect(201)
        .expect(({ body }) => {
          assert(!_.isEmpty(body));
        })
    );
  });

  describe('fault tolerance', () => {
    it('should not throw error',
      () => request.post('/provider/email/recipient/batch')
        .send([{}, { recipientId, template, vars }])
        .expect(201)
        .expect(({ body }) => {
          assert(body[0].status === 'no recipient');
        })
    );
  });

});
