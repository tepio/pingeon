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
    .set('x-location-group', 'location1')
    .send({ address, firstName, lastName })
    .expect(201));

  it('should be not created recipient again',
    () => request.post('/provider/email/recipient')
      .set('x-location-group', 'location1')
      .send({ recipientId, template, vars })
      .expect(201)
      .expect(({ body }) => {
        const vars = body[0].TemplateModel;
        assert.equal(vars.firstName, firstName);
        assert.equal(vars.lastName, lastName);
      })
  );

});
