import normalizeToObject from '../../helpers/mongoose-pluging/normalize-to-object';
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
schema.plugin(normalizeToObject);

module.exports = mongoose.model('recipientProviders', schema);
