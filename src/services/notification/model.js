import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  recipientId: {
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
  deviceId: String,
  payload: Object,
  message: String,
  providerMessageId: String,
  sendDate: Date,
  received: Boolean,
  receiveStatus: Object,
  error: Object
});

module.exports = mongoose.model('notification', schema);
