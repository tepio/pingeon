require('./test-env');

const multiDB = require('mongoose-multi-connect');
const { ObjectId } = require('mongoose').mongo;
const _id = new ObjectId();
const locationGroup = 'location1';

describe('Mongoose plugins', () => {

  describe('Normalize toObject', () => {

    it('should have id instead of _id', async() => {
      const Recipient = multiDB.getModel('recipients', locationGroup);
      const recipient = (await Recipient.create({ _id })).toObject();

      assert.equal(String(recipient.id), String(_id));
      assert(!recipient._id);
      assert(!recipient.__v);
    });

    it('should get over rest right', () => {
      return request.get('/recipients/' + String(_id))
        .set('x-location-group', locationGroup)
        .expect(200)
        .expect(({ body }) => {
          assert.equal(String(body.id), String(_id));
          assert(!body._id);
          assert(!body.__v);
        });
    });

  });

});
