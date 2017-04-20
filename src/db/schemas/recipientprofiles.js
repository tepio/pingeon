const { Schema } = require('mongoose');

module.exports = new Schema({
  recipientId: {
    type: String,
    required: true
  },
  providerType: {
    type: String,
    required: true,
    enum: ['push', 'pubsub', 'email']
  },
  address: {
    type: String
  },
  platform: {
    type: String,
    enum: ['android', 'ios']
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  deviceId: String,
  app: Object,
  token: String
}, { versionKey: false });
