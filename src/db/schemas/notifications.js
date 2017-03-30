import { Schema } from 'mongoose';

module.exports = new Schema({
  recipientId: String,
  address: {
    type: String
  },
  platform: {
    type: String,
    enum: ['android', 'ios']
  },
  deviceId: String,
  token: String,
  payload: Object,
  message: String,
  app: Object,
  providerMessageId: String,
  sendDate: Date,
  received: Boolean,
  receiveStatus: Object,
  error: Object,
  locationGroup: String
}, { versionKey: false });
