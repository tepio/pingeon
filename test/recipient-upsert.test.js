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
      .set('x-location-group', 'location1')
      .expect(({ body }) => {
        assert.equal(body.firstName, recipient.firstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
        assert.equal(body.id, recipient.id);
      })
      .expect(201);
  });

  it('update', () => {
    return request.post('/recipients')
      .send({ id: recipient.id, firstName: newFirstName })
      .set('x-location-group', 'location1')
      .expect(({ body }) => {
        assert.equal(body.id, recipient.id);
        assert.equal(body.firstName, newFirstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
      })
      .expect(201);
  });

  it('find in needed location group', () => {
    return request.get('/recipients/' + String(recipient.id))
      .set('x-location-group', 'location1')
      .expect(200);
  });

  it('find in another location group', () => {
    return request.get('/recipients/' + String(recipient.id)).expect(404);
  });

});
