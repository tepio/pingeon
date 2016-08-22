require('./test-env');

const { ObjectId } = require('mongoose').mongo;

const recipient = {
  id: new ObjectId(),
  firstName: 'John',
  lastName: 'Testerson',
  gender: 'male'
};
const newFirstName = 'Jonny';

describe('Recipient upsert', () => {

  it('insert', () => {
    return request.post('/recipients')
      .send(recipient)
      .expect(201)
      .expect(({ body }) => {
        assert.equal(body.firstName, recipient.firstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
        recipient.id = body.id;
      });
  });

  it('update', () => {
    return request.post('/recipients')
      .send({ id: recipient.id, firstName: newFirstName })
      .expect(201)
      .expect(({ body }) => {
        assert.equal(body.id, recipient.id);
        assert.equal(body.firstName, newFirstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
      });
  });

});
