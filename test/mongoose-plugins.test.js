require('./test-env');

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = require('mongoose').mongo;
const normalizeToObject = require('../src/helpers/mongoose-pluging/normalize-to-object');

const schema = new Schema({});
schema.plugin(normalizeToObject);

const Some = mongoose.model('some', schema);

describe('Mongoose plugins', () => {

  describe('Normalize toObject', () => {

    it('should have id instead of _id', async() => {
      const _id = new ObjectId();
      const post = (await Some.create({ _id })).toObject();

      assert.equal(String(post.id), String(_id));
      assert(!post._id);
      assert(!post.__v);
    });

  });

});
