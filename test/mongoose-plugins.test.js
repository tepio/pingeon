require('./test-env');

const Recipient = require('../src/services/recipient/model');

const { ObjectId } = require('mongoose').mongo;
const _id = new ObjectId();

describe('Mongoose plugins', () => {

  describe('Normalize toObject', () => {

    it('should have id instead of _id', async() => {
      const recipient = (await Recipient.create({ _id })).toObject();

      assert.equal(String(recipient.id), String(_id));
      assert(!recipient._id);
      assert(!recipient.__v);
    });

    it('should get over rest right', () => {
      return request.get('/recipients/' + String(_id))
        .expect(200)
        .expect(({ body }) => {
          assert.equal(String(body.id), String(_id));
          assert(!body._id);
          assert(!body.__v);
        });
    });

  });

});
