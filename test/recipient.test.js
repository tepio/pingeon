require('./test-env');

const recipient = {
  firstName: 'John',
  lastName: 'Testerson',
  gender: 'male'
};

const lastActivity = new Date();

describe('Recipient', () => {

  it('should register', () => {
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

  it('should updates', () => {
    return request.patch('/recipients/' + recipient.id)
      .send({ lastActivity })
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body.id, recipient.id);
        assert.equal(body.firstName, recipient.firstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
        assert.equal(+new Date(body.lastActivity), +new Date(lastActivity));
      });
  });

});
