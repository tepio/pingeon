import simpleId from '../../helpers/mongoose-pluging/simple-id';
import mongoose, { Schema } from 'mongoose';

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
schema.plugin(simpleId);

module.exports = mongoose.model('recipientProviders', schema);
