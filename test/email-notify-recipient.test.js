require('./test-env');

const { ObjectId } = require('mongoose').mongo;

const recipientId = new ObjectId();
const address = 'som@tep.io';
const firstName = 'John';
const lastName = 'Testerson';

const template = 'any';
const vars = { whatever: 'some' };

describe('Email notify recipient', () => {

  before(() => request
    .post(`/recipients/${recipientId}/profiles/email`)
    .send({ address, firstName, lastName })
    .expect(201));

  it('should be not created recipient again',
    () => request.post('/provider/email/recipient')
      .send({ recipientId, template, vars })
      .expect(201)
      .expect(({ body }) => {
        const { FIRST_NAME, LAST_NAME } = body[0].vars;
        assert.equal(FIRST_NAME, firstName);
        assert.equal(LAST_NAME, lastName);
      })
  );

});
