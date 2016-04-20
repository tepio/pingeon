import mongoose, { Schema } from 'mongoose';
import feathersMongoose from 'feathers-mongoose';

const schema = new Schema({
  recipientId: {
    type: String,
    required: true
  },
  providerType: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    enum: ['android', 'ios']
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  deviceId: String
});

const model = mongoose.model('recipientProviders', schema);

module.exports = feathersMongoose({ Model: model });
