require('./test-env');

const { ObjectId } = require('mongoose').mongo;

const recipient = {
  _id: new ObjectId(),
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
        assert.equal(body._id, recipient._id);
        assert.equal(body.firstName, recipient.firstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
      });
  });

  it('should updates', () => {
    return request.patch('/recipients/' + recipient._id)
      .send({ lastActivity })
      .expect(200)
      .expect(({ body }) => {
        assert.equal(body._id, recipient._id);
        assert.equal(body.firstName, recipient.firstName);
        assert.equal(body.lastName, recipient.lastName);
        assert.equal(body.gender, recipient.gender);
        assert.equal(+new Date(body.lastActivity), +new Date(lastActivity));
      });
  });

});
