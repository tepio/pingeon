require('./test-env');

const _ = require('lodash');
const { createRecipientProfile, setLocationGroup } = require('./helpers');
const { ObjectId } = require('mongoose').mongo;

const recipientId = new ObjectId();
const template = 'any';
const vars = { whatever: 'some' };

describe('Email notify recipient', () => {

  before(async() => {
    setLocationGroup('location1');
    await createRecipientProfile({ recipientId, providerType: 'email' });
  });

  describe('success', () => {
    it('should be sent to recipient',
      () => request.post('/provider/email/recipient/batch')
        .set('x-location-group', 'location1')
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
        .set('x-location-group', 'location1')
        .send([{}, { recipientId, template, vars }])
        .expect(201)
        .expect(({ body }) => {
          assert(body[0].status === 'no recipient');
        })
    );
  });

});
