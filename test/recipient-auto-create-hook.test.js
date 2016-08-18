require('./test-env');

const { ObjectId } = require('mongoose').mongo;

const recipientId = new ObjectId();
const address = 'som@tep.io';
const firstName = 'John';
const lastName = 'Testerson';

describe('Recipient auto create hook', () => {

  before(() => request
    .post(`/recipients/${recipientId}/profiles/email`)
    .send({ address, firstName, lastName })
    .expect(201));

  it('should be created recipient',
    () => request.get(`/recipients/${recipientId}`)
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.id, recipientId);
        assert.equal(body.firstName, firstName);
        assert.equal(body.lastName, lastName);
      }));

  it('should be not created recipient again',
    () => request.post(`/recipients/${recipientId}/profiles/email`)
      .send({ address, firstName, lastName })
      .expect(201));

});
