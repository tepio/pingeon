require('./test-env');

const recipient = {
  firstName: 'John',
  lastName: 'Testerson',
  gender: 'male'
};

const lastActivity = new Date();

describe('location group database', () => {

  it('should register', () => {
    return request.post('/recipients')
      .set('x-location-group', 'location1')
      .send(recipient)
      .expect(({ body }) => {
        assert.equal(body.firstName, recipient.firstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
        recipient.id = body.id;
      })
      .expect(201);
  });

  it('should updates', () => {
    return request.patch('/recipients/' + recipient.id)
      .send({ lastActivity })
      .set('x-location-group', 'location1')
      .expect(({ body }) => {
        assert.equal(body.id, recipient.id);
        assert.equal(body.firstName, recipient.firstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
        assert.equal(+new Date(body.lastActivity), +new Date(lastActivity));
      })
      .expect(200);
  });

});
