import renameId from 'mongoose-rename-id';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
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
  providerMessageId: String,
  sendDate: Date,
  received: Boolean,
  receiveStatus: Object,
  error: Object
});
schema.plugin(renameId({ newIdName: 'id', mongoose }));

module.exports = mongoose.model('notification', schema);
